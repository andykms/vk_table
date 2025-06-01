export type Test = {
  [key: string]: (value: string) => boolean | string;
}

export interface ValidationTest {
  validate: valdationFunction;
  name: string;
}

export type valdationFunction = (value: string) => boolean|string;

export type FormValidation = {
  [key in string]: ValidationTest[];
}


