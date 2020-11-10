import { ValidateResponse } from "./response";
export declare type DefaultValue<T> = T | (() => T) | (() => Promise<T>);
export declare type Convert<T = any> = (value: T) => T | Promise<T>;
export declare type BaseDefaultRule = {
    label: string;
    isOptional?: boolean;
    message?: string;
};
export declare type BaseRule<T> = BaseDefaultRule & {
    defaultValue?: DefaultValue<T>;
    convert?: Convert<T>;
};
export declare type ArrayBaseRule<T> = BaseDefaultRule & {
    defaultValue?: DefaultValue<Array<T>>;
    convert?: Convert<Array<T>>;
};
export declare type StringRule = BaseRule<string> & {
    type: "string";
};
export declare type MailRule = BaseRule<string> & {
    type: "mail";
};
export declare type ZipcodeRule = BaseRule<string> & {
    type: "zipcode";
};
export declare type RangeStringLengthRule = BaseRule<number> & {
    type: "rangeLength";
    min?: number;
    max?: number;
};
export declare type MatchRule = BaseRule<string> & {
    type: "match";
    regexp: RegExp;
};
export declare type NumberRule = BaseRule<number> & {
    type: "number";
};
export declare type RangeNumberRule = BaseRule<number> & {
    type: "rangeNumber";
    min?: number;
    max?: number;
};
export declare type BooleanRule = BaseRule<boolean> & {
    type: "boolean";
};
export declare type ArrayRule<T = any> = ArrayBaseRule<T> & {
    type: "array";
    rule: SingleRule<T>;
};
export declare type DateRule = BaseRule<Date | string> & {
    type: "date";
};
export declare type InRule<T = any> = BaseRule<T> & {
    type: "in";
    options: any[];
};
export declare type DateBetweenRule = BaseRule<string | Date> & {
    type: "dateBetween";
    from?: string | Date;
    to?: string | Date;
};
export declare type EqualRule<T = any> = BaseRule<T> & {
    type: "equal";
    value: T;
};
export declare type NotEqualRule<T = any> = BaseRule<T> & {
    type: "notEqual";
    value: T;
};
export declare type CustomReturnBoolean = {
    func: (value: any) => boolean | Promise<boolean>;
    message: string;
};
export declare type CustomValidateResponse = ValidateResponse | {
    error: string;
};
export declare type CustomReturnMessage = {
    func: (value: any) => CustomValidateResponse | Promise<CustomValidateResponse>;
};
export declare type CustomAllRule<T = any> = BaseRule<T> & {
    type: "customAll";
} & (CustomReturnBoolean | CustomReturnMessage);
export declare type CustomRule<T = any> = BaseRule<T> & {
    type: "custom";
} & (CustomReturnBoolean | CustomReturnMessage);
export declare type CustomTypeRule<T = any> = CustomAllRule<T> | CustomRule<T>;
export declare type StringTypeRule<T = string> = StringRule | MailRule | ZipcodeRule | RangeStringLengthRule | MatchRule | DateRule | DateBetweenRule | InRule<T> | EqualRule<T> | NotEqualRule<T>;
export declare type NumberTypeRule<T = number> = NumberRule | RangeNumberRule | InRule<T> | EqualRule<T> | NotEqualRule<T>;
export declare type DateTypeRule = DateRule | DateBetweenRule;
export declare type NestTypeRules<T = any> = NestRule<T> | ArrayNestRule<T> | IndexSignatureRule<T> | IndexSignatureObjectRule<T> | IndexSignatureArrayRule<T> | ArrayRule<T>;
export declare type DefaultRule<T = any> = StringTypeRule<T> | NumberTypeRule<T> | BooleanRule | DateTypeRule;
export declare type SingleRule<T = any> = DefaultRule<T> | CustomTypeRule<T>;
export declare type RuleType = (DefaultRule | NestTypeRules)["type"];
export declare type Rule<T = any> = T extends string ? StringTypeRule<T> | CustomTypeRule<T> : T extends number ? NumberTypeRule<T> | CustomTypeRule<T> : T extends Date ? DateTypeRule | CustomTypeRule : T extends boolean ? BooleanRule | CustomTypeRule : T extends Array<infer U> ? U extends object ? ArrayNestRule<U> | CustomTypeRule : ArrayRule<U> | CustomTypeRule : T extends object ? IndexSignatureRules<T> | NestRule<T> | CustomTypeRule : SingleRule | NestTypeRules<T>;
export declare type IndexSignatureType<T> = {
    [key: string]: T;
};
export declare type Rules<T> = {
    [key in keyof T]: Rule<T[key]>;
};
export declare type NestRule<T = any> = BaseRule<T> & {
    type: "nest";
    rules: Rules<T>;
};
export declare type ArrayNestRule<T = any> = ArrayBaseRule<T> & {
    type: "arrayNest";
    rules: Rules<T>;
};
export declare type IndexSignatureRules<T = any> = T extends IndexSignatureType<infer U> ? U extends Array<infer UU> ? IndexSignatureArrayRule<UU> : U extends string | number | boolean ? IndexSignatureRule<U> : IndexSignatureObjectRule<U> : never;
export declare type IndexSignatureRule<T = any> = BaseRule<T> & {
    type: "indexSignature";
    rule: SingleRule<T>;
};
export declare type IndexSignatureObjectRule<T = any> = BaseRule<T> & {
    type: "indexSignatureObject";
    rules: Rules<T>;
};
export declare type IndexSignatureArrayRule<T = any> = BaseRule<T> & {
    type: "indexSignatureArray";
    rules: Rules<T>;
};
