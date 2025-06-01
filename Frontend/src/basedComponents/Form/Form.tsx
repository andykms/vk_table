import { Input } from "../../ui/Input/Input";
import { Test, ValidationTest, valdationFunction, FormValidation } from "../../types/Form/FormValidationTypes";
import { Button } from "../../ui/Button/Button";
import style from './Form.module.scss';
import React, { useState } from "react";
import { data } from "react-router-dom";
import { set } from "react-hook-form";

export interface FormData {
  [key: string]: {
    value: string,
    type: string,
    name: string,
  };
}

export interface FormProps {
  fields: FormData;
  validations: FormValidation;
  buttonSubmitText: string;
  onSubmit: (data: FormData) => void;
  onChange: (field: string, value: string) => void;
}

export function Form(props: FormProps) {
  const { fields, validations, onSubmit, buttonSubmitText, onChange } = props;
  const onSubmitForm = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    props.onSubmit(fields);
  }
  
  const initialErrors: {[key: string]: string} = {};
  Object.keys(fields).forEach((field)=>{
    initialErrors[field] = '';
  })
  const [errors, setErrors] = useState(initialErrors);
  
  const onChangeInput = (field: string, evt: React.ChangeEvent<HTMLInputElement>) => {
   
    validations[field].forEach((test)=>{
      console.log(test.validate(evt.target.value))
      const result = test.validate(evt.target.value);
      if(typeof result === "string") {
        setErrors({...errors, [field]: result});
      } else {
        setErrors({...errors, [field]: ''});
      }
    });
    console.log(errors)
    onChange(field, evt.target.value);
  }
  return (
    <form className={style.form}>
      {
        Object.keys(fields).map((field, index)=>{
          return (
            <Input 
              key={`#FORM${index}`}
              label={field}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>)=> onChangeInput(field, evt)}
              value={fields[field]?.value}
              error={errors[field]}
            />
          )
        })
      }
      <Button onClick={(evt: React.MouseEvent)=>{evt.preventDefault(); onSubmit(fields)}}>{buttonSubmitText}</Button>
    </form>
  );
};