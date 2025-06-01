import { Input } from "../../ui/Input/Input";
import { Test, ValidationTest, valdationFunction, FormValidation } from "../../types/Form/FormValidationTypes";
import { Button } from "../../ui/Button/Button";
import style from './Form.module.scss';
import React from "react";

export interface FormData {
  [key: string]: {
    value: string
  };
}

export interface FormProps {
  fields: string[];
  validations: FormValidation;
  values: FormData;
  buttonSubmitText: string;
  onSubmit: (data: FormData) => void;
  onChange: (field: string, value: string) => void;
}

export function Form(props: FormProps) {
  const { fields, validations, onSubmit, buttonSubmitText, values, onChange } = props;

  const onSubmitForm = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    props.onSubmit(props.values);
  }
  
  const errors: {[key: string]: string} = {};

  fields.forEach((field)=>{
    errors[field] = '';
  })

  const onChangeInput = (field: string, evt: React.ChangeEvent<HTMLInputElement>) => {
    validations[field].forEach((test)=>{
      const result = test.validate(evt.target.value);
      if(typeof result === "string") {
        errors[field] = result;
      }
    });
    onChange(field, evt.target.value);
  }
  console.log('')
  return (
    <form onSubmit={onSubmitForm} className={style.form}>
      {
        fields.map((field, index)=>{
          const validationTests: Test = {};
          if(validations[field]) {
            validations[field].forEach((test)=>{
              validationTests[test.name] = (value:string) => {
                return test.validate(value);
              };
            });
          }
          return (
            <Input 
              key={`#FORM${index}`}
              label={field}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>)=> onChangeInput(field, evt)}
              value={values[field]?.value}
              error={errors[field]}
            />
          )
        })
      }
      <Button type={'submit'} onClick={(evt: React.MouseEvent)=>{evt.preventDefault()}}>{buttonSubmitText}</Button>
    </form>
  );
};