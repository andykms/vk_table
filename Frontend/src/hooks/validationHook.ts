import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { RootState } from "../services/store";
import { FormFieldPayload } from "../types/Form/FormField";
import {FormValidator} from '../types/Form/FormValidator';
import { useSelector } from "react-redux";
import { ErrorState } from "../types/Form/ErrorState";


export function useFormWithValidation<T>(
  selector: (state: RootState) => T,
  setFormValue: ActionCreatorWithPayload<FormFieldPayload>,
  validators: FormValidator<T>,
) {
  const values = useSelector(selector);
  const [errors, setErrors] = React.useState()
}