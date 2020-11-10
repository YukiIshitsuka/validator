## @lu/validator

@lu/validator is a library that validates and converts json format data.

## Sample

```typescript
import { Validator, ValidationError } from "./validator";

type Sample = {
	parameter1: string;
	parameter2: number;
};
Validator.parse<Sample>(
	{
		parameter1: "aaa",
		parameter2: 1,
		dummy: "xxx",
	},
	{
	parameter1: {
			label: "parameter1 label",
			type: "string",
		},
	parameter2: {
		label: "parameter2 label",
		type: "number",
	},
}).then((data) => {
	/*
	 * only defined value
	 * data {
	 *	 parameter1: "aaa",
	 *   parameter2: 1	
	 * } 
	 */
	console.log(data);
}).catch((error) => {
	if (error instanceof ValidationError) {
		console.error(error.get());
	}
});
```

