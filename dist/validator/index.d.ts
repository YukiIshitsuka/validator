import { Rules } from "../models/rule";
import { ErrorLabels, ErrorObject } from "../models/error";
import { ValidateResponse } from "../models/response";
export declare class ValidationError extends Error {
    errors: ErrorObject;
    constructor(errors: ErrorObject);
    get(): ErrorObject;
}
export declare class Validator<T> {
    private data;
    private rules;
    protected static errorLabels: ErrorLabels;
    /**
     * エラー時のメッセージを変更する。
     * @param {Partial<ErrorLabels>} errorLabels エラーラベル情報
     */
    static changeErrorLabels(errorLabels: Partial<ErrorLabels>): void;
    /**
     * validationしたのちにエラーもしくは、整形したデータを返却するmethod
     * @param {{}} data
     * @param {Rule[]} rules
     * @returns {T}
     */
    static parse<T>(data: {}, rules: Rules<T>): Promise<T>;
    /**
     * validationしたのちにエラーもしくは、整形したデータを返却するmethod
     * @param {{}} data
     * @param {Rule[]} rules
     * @returns {ValidateResponse<T>}
     */
    static validate<T>(data: any, rules: Rules<T>): Promise<ValidateResponse<T>>;
    private errors;
    private values;
    constructor(data: any, rules: Rules<T>);
    private execute;
    private set;
    protected getData(data: any, key: string): any;
    private setValue;
    private setNestValue;
    private setNestArrayValue;
    private setArrayValue;
    private setIndexSignatureValue;
    private setIndexSignatureArrayValue;
    private setIndexSignatureObjectValue;
    private isValid;
    private setCustomValue;
    private setCustomAllValue;
    private addErrorObject;
    private replaceErrorMessage;
}
