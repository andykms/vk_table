export type FormValidator<T>  = {
  [key in keyof T]: {
    validator: (value: string) => boolean,
    message: string,
  }
}