import { RuleType } from "..";

export type ErrorLabels = { [key in RuleType]: string };

export type ErrorObject = {
	[key in string]: string | ErrorObject;
};
