import { Validator, ValidationError } from "../validator";

type NN = {
	value: number;
	label: string;
}
type SigTest = {
	options: { [key: string]: NN[] };
	x: number;
}

export const doValidate = async (): Promise<void> => {
	try {
		const response = await Validator.parse<SigTest>({
			x: 1, options: {
				a: [{ label: "test" ,value:1}],
				b: [{ value: 1, label: "test" }],
		}}, {
			options: {
				type: "indexSignatureArray",
				label: "x",
				rules: {
					value: {
						type: "number",
						label:"value"
					},
					label: {
						type: "string",
						label:"label"
					}
				}
			},
			x: {
				type: "number",
				label:"xxxxxxxx"
			}
		});
		console.log(JSON.stringify(response));
	} catch (error) {
		if (error instanceof ValidationError) {
			console.error(error.get());
		}
		console.error(JSON.stringify(error));
	}
};

(async () => {
	await doValidate();
})();
