import { RuleType } from "..";
export declare type ErrorLabels = {
    [key in RuleType]: string;
};
export declare type ErrorObject = {
    [key in string]: string | ErrorObject;
};
