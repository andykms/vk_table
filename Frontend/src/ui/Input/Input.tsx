import { ForwardedRef, InputHTMLAttributes } from "react";
import style from './Input.module.scss';
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputRef?: ForwardedRef<HTMLInputElement>;
  error?: string;
  value?: string;
  className?: string;
}

export const Input = (props: InputProps) => {
  const { inputRef, error, value, className, ...rest } = props;
  return (
    <label className = {style.label}>
      <input className={clsx(className, style.input)} ref={inputRef} value={value} {...rest} />
      {error && <span className={style.error}>{error}</span>}
    </label>
  )
};