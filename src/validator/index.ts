import validator from "validator";
import {
	Rule,
	Rules,
	SingleRule,
	NestRule,
	ArrayNestRule,
	IndexSignatureRule,
	CustomAllRule,
	CustomRule,
	Convert,
	ArrayRule,
	IndexSignatureArrayRule,
	IndexSignatureObjectRule,
} from "../models/rule";
import { ErrorLabels, ErrorObject } from "../models/error";
import { ValidateResponse } from "../models/response";
import * as moment from "moment";

export class ValidationError extends Error {
	constructor(public errors: ErrorObject) {
		super("validation error");
		Object.setPrototypeOf(this, ValidationError.prototype);
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ValidationError);
		}
		this.name = "ValidationError";
	}
	public get(): ErrorObject {
		return this.errors;
	}
}

export class Validator<T> {
	// 全体のエラーメッセージをstaticで持つようにする。
	protected static errorLabels: ErrorLabels = {
		string: "[[[label]]]について入力してください。",
		rangeLength: "[[[label]]]について[[[min]]]以上[[[max]]]以下で入力してください。",
		mail: "[[[label]]]の形式が正しくありません。",
		match: "[[[label]]]について入力形式が正しくありません。",
		zipcode: "[[[label]]]は(***-****)の形式で入力してください。",
		number: "[[[label]]]について半角数値で入力してください。",
		rangeNumber: "[[[label]]]について[[[min]]]以上[[[max]]]以下の文字数で入力してください。",
		boolean: "[[[label]]]についてチェックを入れてください。",
		in: "[[[label]]]について選択してください。",
		array: "[[[label]]]について入力してください。",
		date: "[[[label]]]について日付を入力してください。",
		dateBetween: "[[[label]]]について「[[[from]]]〜[[[to]]]」の期間にて入力してください。",
		equal: "[[[label]]]が[[[value]]]ではありません。",
		notEqual: "[[[label]]]は[[[value]]]を入力することはできません。",
		nest: "[[[label]]]について入力がありません。",
		arrayNest: "[[[label]]]について入力がありません。",
		indexSignature: "[[[label]]]について入力がありません。",
		indexSignatureArray: "[[[label]]]について入力がありません。",
		indexSignatureObject: "[[[label]]]について入力がありません。",
	};
	/**
	 * エラー時のメッセージを変更する。
	 * @param {Partial<ErrorLabels>} errorLabels エラーラベル情報
	 */
	public static changeErrorLabels(errorLabels: Partial<ErrorLabels>): void {
		this.errorLabels = { ...this.errorLabels, ...errorLabels };
	}
	/**
	 * validationしたのちにエラーもしくは、整形したデータを返却するmethod
	 * @param {{}} data
	 * @param {Rule[]} rules
	 * @returns {T}
	 */
	public static async parse<T>(data: {}, rules: Rules<T>): Promise<T> {
		const v = new Validator<T>(data, rules);
		const response = await v.execute<T>();
		if ("errors" in response) {
			throw new ValidationError(response.errors);
		}
		return response.values;
	}
	/**
	 * validationしたのちにエラーもしくは、整形したデータを返却するmethod
	 * @param {{}} data
	 * @param {Rule[]} rules
	 * @returns {ValidateResponse<T>}
	 */
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public static async validate<T>(data: any, rules: Rules<T>): Promise<ValidateResponse<T>> {
		const v = new Validator<T>(data, rules);
		return await v.execute<T>();
	}

	private errors: ErrorObject = {};
	private values: { [key: string]: any } = {};
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	constructor(private data: any, private rules: Rules<T>) {}

	private async execute<T>(): Promise<ValidateResponse<T>> {
		for (const [key, rule] of Object.entries(this.rules) as [string, Rule<T[keyof T]>][]) {
			await this.setValue(key, rule);
		}
		if (Object.keys(this.errors).length) {
			return { errors: this.errors };
		}
		return { values: this.values as T };
	}
	private async set<Value>(key: string, value: Value, convert?: Convert<Value>): Promise<void> {
		if (convert) {
			this.values[key] = await convert(value);
		} else {
			this.values[key] = value;
		}
	}
	private async setValue(key: string, rule: Rule): Promise<void> {
		if (!this.data || typeof this.data !== "object" || !(key in this.data)) {
			// defaultのセットがある場合は、その値が使える。
			if (rule.isOptional) return;
			if (rule.defaultValue !== undefined) {
				this.values[key] = typeof rule.defaultValue === "function" ? await rule.defaultValue() : rule.defaultValue;
			} else {
				this.addErrorObject(key, this.replaceErrorMessage(rule));
			}
			return;
		}
		const value = this.data[key];
		// nestの処理
		if (rule.type === "nest") {
			return this.setNestValue(key, value, rule);
		}
		// array-nestの処理
		if (rule.type === "arrayNest") {
			return this.setNestArrayValue(key, value, rule);
		}
		if (rule.type === "indexSignature") {
			return this.setIndexSignatureValue(key, value, rule);
		}
		if (rule.type === "indexSignatureObject") {
			return this.setIndexSignatureObjectValue(key, value, rule);
		}
		if (rule.type === "indexSignatureArray") {
			return this.setIndexSignatureArrayValue(key, value, rule);
		}
		if (rule.type === "customAll") {
			return this.setCustomAllValue(key, value, this.data, rule);
		}
		if (rule.type === "custom") {
			return this.setCustomValue(key, value, rule);
		}
		if (rule.type === "array") {
			return this.setArrayValue(key, value, rule);
		}
		// 上記以外
		if (!(await this.isValid(value, rule))) {
			return this.addErrorObject(key, this.replaceErrorMessage(rule));
		}
		// this.values[key] = value;
		await this.set(key, value, rule.convert);
	}
	private async setNestValue(key: string, value: any, rule: NestRule) {
		const response = await Validator.validate<T[keyof T]>(value, rule.rules);
		if ("errors" in response) {
			this.addErrorObject(key, response.errors);
		} else {
			// this.values[key] = response.values;
			await this.set(key, response.values, rule.convert);
		}
	}
	private async setNestArrayValue(key: string, value: any, rule: ArrayNestRule) {
		if (!Array.isArray(value)) {
			return this.addErrorObject(key, this.replaceErrorMessage(rule));
		}
		if (value.length === 0) {
			if (rule.isOptional) {
				this.values[key] = value;
				return;
			} else if (rule.defaultValue) {
				this.values[key] = typeof rule.defaultValue === "function" ? await rule.defaultValue() : rule.defaultValue;
				return;
			}
			return this.addErrorObject(key, this.replaceErrorMessage(rule));
		}
		const values = [];
		const errors: ErrorObject = {};
		let index = 0;
		for (const v of value) {
			const response = await Validator.validate(v, rule.rules);
			if ("errors" in response) {
				errors[index] = response.errors;
			} else {
				values.push(response.values);
			}
			index++;
		}
		if (Object.values(errors).length) {
			this.addErrorObject(key, errors);
		} else {
			// this.values[key] = values;
			this.set(key, values, rule.convert);
		}
	}
	private async setArrayValue(key: string, value: any, rule: ArrayRule) {
		/**
		 * 以下の場合は、optionalじゃないとエラーとする。
		 *  1. 値がない
		 *  2. 配列じゃない
		 */
		if (!value || !Array.isArray(value)) {
			if (rule.isOptional) return;
			return this.addErrorObject(key, this.replaceErrorMessage(rule));
		}
		if (value.length === 0) {
			/**
			 * 以下の場合のみ有効
			 *  1. optionalである・・・空の配列がリクエストされているので、空の配列を返す
			 *  2. defaultValueがある・・・defaultValuに準ずる。
			 */
			if (rule.isOptional) {
				this.values[key] = value;
				return;
			}
			if (rule.defaultValue !== undefined) {
				this.values[key] = typeof rule.defaultValue === "function" ? await rule.defaultValue() : rule.defaultValue;
			} else {
				this.addErrorObject(key, this.replaceErrorMessage(rule));
			}
			return;
		}
		const values = [];
		const errors: ErrorObject = {};
		let index = 0;
		for (const v of value) {
			const tmp = { ...rule.rule, label: `${rule.rule.label || rule.label}` };
			if (!(await this.isValid(value, tmp))) {
				errors[index] = this.replaceErrorMessage(tmp);
			} else {
				values.push(v);
			}
			index++;
		}
		const rules: Rules<{ [key: string]: Rule }> = value.reduce((a, _, index) => {
			return {
				...a,
				[index.toString()]: {
					...rule.rule,
					label: `${index + 1}つ目の${rule.label}`,
				} as Rule,
			};
		}, {});
		const response = await Validator.validate(value, rules);
		if ("errors" in response) {
			this.addErrorObject(key, response.errors);
		} else {
			this.set(key, Object.values(response.values), rule.convert);
		}
	}
	private async setIndexSignatureValue(key: string, value: any, rule: IndexSignatureRule) {
		if (!value || typeof value !== "object") {
			if (rule.isOptional) return;
			return;
		}
		const values = {};
		const errors: ErrorObject = {};
		const targetValues = Object.entries(value);
		if (targetValues.length === 0) {
			return this.addErrorObject(key, this.replaceErrorMessage(rule));
		}
		for (const [k, v] of targetValues) {
			const tmp = { ...rule.rule, label: `${rule.rule.label || rule.label}` };
			if (await this.isValid(v, tmp)) {
				values[k] = v;
			} else {
				errors[k] = this.replaceErrorMessage(tmp);
			}
		}
		if (Object.values(errors).length) {
			this.addErrorObject(key, errors);
		} else {
			this.set(key, values, rule.convert);
		}
	}
	private async setIndexSignatureArrayValue(key: string, value: any, rule: IndexSignatureArrayRule) {
		if (!value || typeof value !== "object") {
			if (rule.isOptional) return;
			return;
		}
		const errors: ErrorObject = {};
		const values: { [key: string]: any } = {};
		const targetValues = Object.entries(value);
		if (targetValues.length === 0) {
			return this.addErrorObject(key, this.replaceErrorMessage(rule));
		}
		for (const [k, v] of targetValues) {
			if (!v || !Array.isArray(v) || v.length === 0) {
				if (!rule.isOptional) {
					if (rule.defaultValue !== undefined) {
						values[k] = typeof rule.defaultValue === "function" ? await rule.defaultValue() : rule.defaultValue;
					} else {
						errors[k] = this.replaceErrorMessage(rule);
					}
				}
				continue;
			}
			const targetValues = [];
			let index = 0;
			for (const vv of v) {
				const response = await Validator.validate(vv, rule.rules);
				if ("errors" in response) {
					if (!errors[k]) errors[k] = {};
					errors[k][index] = response.errors;
				} else {
					targetValues.push(response.values);
				}
				index++;
			}
			values[k] = targetValues;
		}
		if (Object.values(errors).length) {
			this.addErrorObject(key, errors);
		} else {
			// this.values[key] = values;
			this.set(key, values, rule.convert);
		}
	}
	private async setIndexSignatureObjectValue(key: string, value: any, rule: IndexSignatureObjectRule) {
		if (!value || typeof value !== "object") {
			if (rule.isOptional) return;
			return this.addErrorObject(key, this.replaceErrorMessage(rule));
		}
		const errors: { [key: string]: ErrorObject } = {};
		const values: { [key: string]: any } = {};
		for (const [k, v] of Object.entries(value)) {
			const response = await Validator.validate(v, rule.rules);
			if ("errors" in response) {
				errors[k] = response.errors;
			} else {
				values[k] = response.values;
			}
		}
		if (Object.values(errors).length) {
			this.addErrorObject(key, errors);
		} else {
			// this.values[key] = values;
			this.set(key, values, rule.convert);
		}
	}
	private async isValid(value: any, rule: SingleRule) {
		if (rule.type === "string") {
			return typeof value === "string" && value.length > 0;
		}
		if (rule.type === "number") {
			return typeof value === "number";
		}
		if (rule.type === "boolean") {
			return typeof value === "boolean";
		}
		if (rule.type === "rangeNumber") {
			if (typeof value !== "number") return false;
			if ((rule.min !== undefined && rule.min > value) || (rule.max !== undefined && rule.max < value)) return false;
			return true;
		}
		if (rule.type === "rangeLength") {
			if (typeof value !== "string") return false;
			const length = value.length;
			if ((rule.min !== undefined && rule.min > length) || (rule.max !== undefined && rule.max < length)) return false;
			return true;
		}
		if (rule.type === "mail") {
			return validator.isEmail(value);
		}
		if (rule.type === "in") {
			// return validator.isIn(value, rule.options);
			return rule.options.indexOf(value) !== -1;
		}
		if (rule.type === "zipcode") {
			return /^\d{3}-\d{4}$/.test(value.toString());
		}
		if (rule.type === "equal") {
			return value === rule.value;
		}
		if (rule.type === "notEqual") {
			return value !== rule.value;
		}
		if (rule.type === "match") {
			return rule.regexp.test(String(value));
		}
		/*/
		if (rule.type === "customAll") {
			// customAllの場合は、その値以外を渡す必要がある。
			return await rule.func(this.data);
		}
		if (rule.type === "custom") {
			// customの場合は、その値のみ。
			return await rule.func(value);
		}
		/*/
		if (rule.type === "date") {
			return value instanceof Date;
		}
		if (rule.type === "dateBetween") {
			const targetDate = moment(value);
			if (rule.from && moment(rule.from).isAfter(targetDate)) return false;
			if (rule.to && moment(rule.to).isBefore(targetDate)) return false;
		}
		return true;
	}
	private async setCustomValue(key: string, value: any, rule: CustomRule) {
		const result = await rule.func(value);
		if (typeof result === "boolean") {
			if (!result) {
				return this.addErrorObject(key, this.replaceErrorMessage(rule));
			}
			// this.values[key] = value;
			this.set(key, value, rule.convert);
			return;
		}
		if ("errors" in result) {
			return this.addErrorObject(key, result.errors);
		}
		if ("error" in result) {
			return this.addErrorObject(key, result.error);
		}
		this.set(key, result.values, rule.convert);
		// this.values[key] = result.values;
	}
	private async setCustomAllValue(key: string, value: any, data: any, rule: CustomAllRule) {
		const result = await rule.func(data);
		if (typeof result === "boolean") {
			if (!result) {
				return this.addErrorObject(key, this.replaceErrorMessage(rule));
			}
			this.set(key, value, rule.convert);
			// this.values[key] = value;
			return;
		}
		if ("errors" in result) {
			return this.addErrorObject(key, result.errors);
		}
		if ("error" in result) {
			return this.addErrorObject(key, result.error);
		}
		this.set(key, result.values, rule.convert);
		// this.values[key] = result.values;
	}
	private addErrorObject(key: string, message: string | ErrorObject) {
		this.errors[key] = message;
	}
	private replaceErrorMessage(rule: Rule): string {
		const baseMessage = rule.message ? rule.message : Validator.errorLabels[rule.type];
		return baseMessage.replace(/\[\[\[([^\\[]+)\]\]\]/g, (_, match: string) => {
			if (match in rule) {
				if (rule.type === "dateBetween") {
					if (match === "from") {
						return rule.from ? moment(rule.from).format("YYYY/MM/DD HH:mm") : "";
					}
					if (match === "to") {
						return rule.to ? moment(rule.to).format("YYYY/MM/DD HH:mm") : "";
					}
				}
				return rule[match];
			}
			return "";
		});
	}
}
