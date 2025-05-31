export type ErrorState<T> = {
  [key in keyof T]: string;
}