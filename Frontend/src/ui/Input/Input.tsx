import { ForwardedRef, InputHTMLAttributes } from "react";
import style from './Input.module.scss';
import clsx from "clsx";
import { useState, useRef } from "react";
import { SyntheticEvent } from "react";

interface InputProps {
  label: string,
  error?: string,
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const Input = (props: InputProps) => {
  const { label, error, onChange, value} = props;
  return (
  <div className={style.inputContiner}>
    <p className = {style.label}>{label}</p>
      <input onChange={onChange} value={value} className={style.input} type={'text'}/>
      {error && <span className={style.error}>{error}</span>}
  </div>
  )
};