import { Input } from "../../ui/Input/Input";
import { Form } from "../../basedComponents/Form/Form";
import { DropDownMenu } from "../../ui/DropDownMenu/DropDownMenu";
import { Button } from "../../ui/Button/Button";
import { FLOAT_TYPE_REGEX, INT_TYPE_REGEX } from "../../constants/Regex";
import { FormValidation } from "../../types/Form/FormValidationTypes";
import style from './AddRecordForm.module.scss';
import { SelectList } from "../../ui/SelectList/SelectList";
import { Field } from "../../ui/Field/Field";
interface FormFieldAddRecord {
  name: string,
  value: string,
  type: string,
}

export interface FormType {
  id: string,
  type: string,
}

interface FormData {
  [key: string]: {
    value: string,
  },
}

interface RecordData {
  [key: string]: {
    value: string,
    name: string,
    type: string
  }
}


export interface AddRecordFormProps {
  formData: RecordData,
  onSubmit: (data: FormData) => void;
  validations: FormValidation,
}


export const AddRecordForm = (props: AddRecordFormProps) => {
  const {onSubmit, validations, formData } = props;
  const chooseType = Object.keys(formData).map((field)=>{
        return <Button onClick={()=>{}} isLikePrint={true}>{`${formData[field].name} : ${formData[field].type}`}</Button>
        //<DropDownMenu menuTitle={formData[field].name} menusElements={[<Field value={formData[field].type} onClick={()=>{}}></Field>]} key={`DROPDOWN_${formData[field].name}`} uniqueKey={formData[field].name}/>
      })

  return (
    <>
      <h2 className={style.title}>Добавить запись</h2>
      <h3 className={style.titleTypes}>Типы полей</h3>
      <section className={style.chooseTypesSection}>
      {chooseType}
      </section>
      <Form buttonSubmitText={'Добавить'} onSubmit={(data: FormData)=>onSubmit(data)} fields={formData} validations={validations}>
      </Form>
    </>
  )
}
