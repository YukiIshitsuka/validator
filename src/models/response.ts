import { ErrorObject } from "./error";

export type ValidateResponse<T = any> =
	| {
			errors: ErrorObject;
	  }
	| {
			values: T;
	  };
