import { Input } from "../../ui/Input/Input";
import { Test, ValidationTest, valdationFunction, FormValidation } from "../../types/Form/FormValidationTypes";
import { Button } from "../../ui/Button/Button";
import style from './Form.module.scss';
import React, { useEffect, useState } from "react";
import { data } from "react-router-dom";
import { set } from "react-hook-form";
import { stat } from "fs";

export interface FormData {
  [key: string]: {
    value: string,
  };
}

export interface FormState {
  [key: string]: {
    error: string|boolean,
    value: string,
  }
}

export interface FormProps {
  fields: FormData;
  validations: FormValidation;
  buttonSubmitText: string;
  onSubmit: (data: FormData) => void;
}

function isValidity(form: FormState) {
  return Object.values(form).every((field)=> {
    return typeof field.error !== 'string';
  })
}

export function Form(props: FormProps) {
  const { fields, validations, onSubmit, buttonSubmitText } = props;

  const onSubmitForm = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    onSubmit(formState);
  }
  
  const initialFormState: FormState ={};
  Object.keys(fields).forEach((field)=>{
    initialFormState[field] = {
      error: '',
      value: fields[field].value,
    }
  })
  const [formState, setForm] = useState<FormState>(initialFormState);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(()=>{
    if(!isValidity(formState)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [formState])

  const onChangeInput = (field: string, evt: React.ChangeEvent<HTMLInputElement>) => {
    let error: string|boolean = false;
    const value = evt.target.value;
    validations[field].forEach((test)=>{
      let currentError = test.validate(value);
      if(typeof currentError === 'string') {
        error = currentError;
      }
    })
    const newState: FormState = {};
    Object.keys(formState).forEach((state)=>{
      if(field === state){
        newState[state] = {
          value: value,
          error: error,
        }
      } else {
        newState[state] = {
          value: formState[state].value,
          error: formState[state].error
        }
      }
    })
    setForm(newState);
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
              value={formState[field].value}
              error={typeof formState[field].error === 'string' ? formState[field].error : ''}
            />
          )
        })
      }
      <Button disabled = {disabled} onClick={onSubmitForm}>{buttonSubmitText}</Button>
    </form>
  );
};