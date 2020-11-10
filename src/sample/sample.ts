import { Validator, ValidationError } from "../validator";
import * as moment from "moment";

type XX = "aa" | "bb";
const xx: XX[] = ["aa", "bb"];
type Sample = {
	aa: string;
	bb: string;
	cc?: number;
	test: {
		a: string;
		i: string;
	};
	d: XX;
	xxx: { x: number }[];
	yyy: number[];
	date: Date;
	indexSig: {
		[key: string]: {
			sample: number;
		};
	};
};

export const doValidate = async (): Promise<void> => {
	try {
		const response = await Validator.parse<Sample>(
			{
				aa: "aaa",
				bb: 1,
				test: { a: "111" },
				date: "2020-07-01",
				dddd: "xxxx",
				xxx: [{ x: 1 }],
				だめなやつ: {
					aaa: {
						sample: 1,
					},
				},
				indexSig: {
					x: { sample: 11 },
				},
			},
			{
				d: {
					type: "in",
					label: "aaa",
					options: xx,
					defaultValue: "aa",
				},
				aa: {
					label: "ああ",
					type: "string",
					convert: (value: string) => `customize: ${value}`,
				},
				bb: {
					label: "びーびー",
					type: "in",
					options: [1, "sample", "test"],
				},
				cc: {
					label: "xxxxx",
					type: "number",
					isOptional: true,
					defaultValue: 1334,
				},
				test: {
					label: "テスト",
					type: "nest",
					rules: {
						a: {
							label: "あ",
							type: "string",
							convert: (value: string) => `customize: ${value}`,
						},
						i: {
							label: "い",
							type: "string",
							defaultValue: "",
						},
					},
				},
				xxx: {
					label: "あああ",
					type: "arrayNest",
					rules: {
						x: {
							label: "a",
							type: "number",
						},
					},
				},
				yyy: {
					isOptional: true,
					label: "aaa",
					type: "array",
					rule: {
						type: "in",
						label: "",
						options: [1],
					},
				},
				date: {
					label: "日付",
					type: "dateBetween",
					to: moment("2020-08-01").format("YYYY-MM-DD"),
				},
				indexSig: {
					label: "indexsig",
					type: "indexSignatureObject",
					rules: {
						sample: {
							type: "number",
							label: "indexsig sample",
						},
					},
				},
			}
		);
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
