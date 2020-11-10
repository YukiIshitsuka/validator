import { ErrorObject } from "./error";
export declare type ValidateResponse<T = any> = {
    errors: ErrorObject;
} | {
    values: T;
};
