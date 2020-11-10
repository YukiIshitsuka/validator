import { Validator, ValidationError } from "../validator";

type SigTest = {
	x: {
		[key: string]: string;
	}
}

export const doValidate = async (): Promise<void> => {
	try {
		const response = await Validator.parse<SigTest>({
			x: {
				xx: 22,
			}
		}, {
			x: {
				type: "indexSignature",
				label: "xxxx",
				rule: {
					type: "string",
					label: "test"
				}
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
