import { ValidateResponse } from "./response";

export type DefaultValue<T> = T | (() => T) | (() => Promise<T>);
export type Convert<T = any> = (value: T) => T | Promise<T>;

export type BaseDefaultRule = {
	label: string;
	isOptional?: boolean;
	message?: string;
};

export type BaseRule<T> = BaseDefaultRule & {
	defaultValue?: DefaultValue<T>;
	convert?: Convert<T>;
};

export type ArrayBaseRule<T> = BaseDefaultRule & {
	defaultValue?: DefaultValue<Array<T>>;
	convert?: Convert<Array<T>>;
};

// 文字列処理の処理
export type StringRule = BaseRule<string> & {
	type: "string";
};

export type MailRule = BaseRule<string> & {
	type: "mail";
};

export type ZipcodeRule = BaseRule<string> & {
	type: "zipcode";
};

export type RangeStringLengthRule = BaseRule<number> & {
	type: "rangeLength";
	min?: number;
	max?: number;
};

export type MatchRule = BaseRule<string> & {
	type: "match";
	regexp: RegExp;
};

// 数値の処理
export type NumberRule = BaseRule<number> & {
	type: "number";
};

export type RangeNumberRule = BaseRule<number> & {
	type: "rangeNumber";
	min?: number;
	max?: number;
};

// booleanの処理
export type BooleanRule = BaseRule<boolean> & {
	type: "boolean";
};

// 配列の処理。
export type ArrayRule<T = any> = ArrayBaseRule<T> & {
	type: "array";
	rule: SingleRule<T>;
};

// 日付の処理
export type DateRule = BaseRule<Date | string> & {
	type: "date";
};

// string でも intでもいける。
export type InRule<T = any> = BaseRule<T> & {
	type: "in";
	options: any[];
};

export type DateBetweenRule = BaseRule<string | Date> & {
	type: "dateBetween";
	from?: string | Date;
	to?: string | Date;
};

export type EqualRule<T = any> = BaseRule<T> & {
	type: "equal";
	value: T;
};

export type NotEqualRule<T = any> = BaseRule<T> & {
	type: "notEqual";
	value: T;
};

// customのルール。
export type CustomReturnBoolean = {
	func: (value: any) => boolean | Promise<boolean>;
	message: string;
};

export type CustomValidateResponse =
	| ValidateResponse
	| {
			error: string;
	  };
export type CustomReturnMessage = {
	func: (value: any) => CustomValidateResponse | Promise<CustomValidateResponse>;
};

export type CustomAllRule<T = any> = BaseRule<T> & {
	type: "customAll";
} & (CustomReturnBoolean | CustomReturnMessage);

export type CustomRule<T = any> = BaseRule<T> & {
	type: "custom";
} & (CustomReturnBoolean | CustomReturnMessage);

export type CustomTypeRule<T = any> = CustomAllRule<T> | CustomRule<T>;

export type StringTypeRule<T = string> =
	| StringRule
	| MailRule
	| ZipcodeRule
	| RangeStringLengthRule
	| MatchRule
	| DateRule
	| DateBetweenRule
	| InRule<T>
	| EqualRule<T>
	| NotEqualRule<T>;

export type NumberTypeRule<T = number> = NumberRule | RangeNumberRule | InRule<T> | EqualRule<T> | NotEqualRule<T>;

export type DateTypeRule = DateRule | DateBetweenRule;
export type NestTypeRules<T = any> =
	| NestRule<T>
	| ArrayNestRule<T>
	| IndexSignatureRule<T>
	| IndexSignatureObjectRule<T>
	| IndexSignatureArrayRule<T>
	| ArrayRule<T>;

export type DefaultRule<T = any> = StringTypeRule<T> | NumberTypeRule<T> | BooleanRule | DateTypeRule;
export type SingleRule<T = any> = DefaultRule<T> | CustomTypeRule<T>;

export type RuleType = (DefaultRule | NestTypeRules)["type"];

export type Rule<T = any> = T extends string
	? StringTypeRule<T> | CustomTypeRule<T>
	: T extends number
	? NumberTypeRule<T> | CustomTypeRule<T>
	: T extends Date
	? DateTypeRule | CustomTypeRule
	: T extends boolean
	? BooleanRule | CustomTypeRule
	: T extends Array<infer U>
	? U extends object
		? ArrayNestRule<U> | CustomTypeRule
		: ArrayRule<U> | CustomTypeRule
	: T extends object
	? IndexSignatureRules<T> | NestRule<T> | CustomTypeRule
	: SingleRule | NestTypeRules<T>;

export type IndexSignatureType<T> = {
	[key: string]: T;
};

export type Rules<T> = {
	[key in keyof T]: Rule<T[key]>;
};

export type NestRule<T = any> = BaseRule<T> & {
	type: "nest";
	rules: Rules<T>;
};

export type ArrayNestRule<T = any> = ArrayBaseRule<T> & {
	type: "arrayNest";
	rules: Rules<T>;
};

export type IndexSignatureRules<T = any> = T extends IndexSignatureType<infer U>
	? U extends Array<infer UU>
		? IndexSignatureArrayRule<UU>
		: U extends string | number | boolean
		? IndexSignatureRule<U>
		: IndexSignatureObjectRule<U>
	: never;

export type IndexSignatureRule<T = any> = BaseRule<T> & {
	type: "indexSignature";
	rule: SingleRule<T>;
};

export type IndexSignatureObjectRule<T = any> = BaseRule<T> & {
	type: "indexSignatureObject";
	rules: Rules<T>;
};

export type IndexSignatureArrayRule<T = any> = BaseRule<T> & {
	type: "indexSignatureArray";
	rules: Rules<T>;
};
