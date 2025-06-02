import { FLOAT_TYPE_REGEX, INT_TYPE_REGEX } from '../constants/Regex'

export type validationFunction = (value: string) => boolean | string

export interface ValiationTest {
	validate: validationFunction
	name: string
}

export interface FormValidation {
	[key: string]: ValiationTest[]
}

export interface Field {
	[key: string]: {
		name: string,
		type: string
	};
}

export const createValidationsRules = (fields: Field): FormValidation => {
	let validations: FormValidation = {}

	Object.keys(fields).forEach((field) => {
    if(!validations[field]) validations[field] = [];
		validations[field].push({
			validate: (value: string) => {
				if (value.length === 0) {
					return 'Необходимо заполнить поле'
				}
				switch (fields[field].type) {
					case 'float':
						return FLOAT_TYPE_REGEX.test(value)
							? true
							: 'Необходимо ввести число с плавающей точкой'
					case 'integer':
						return INT_TYPE_REGEX.test(value)
							? true
							: 'Необходимо ввести целое число'
					case 'boolean':
						return value === 'true' || value === 'false' || value === '0'
							? true
							: 'Необходимо ввести true или false'
					case 'null':
						return value === 'null' ? true : 'Необходимо ввести null'
					default:
						return true
				}
			},
			name: fields[field].name,
		})
	})
	return validations
}
