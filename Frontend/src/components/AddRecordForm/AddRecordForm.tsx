import { Input } from "../../ui/Input/Input";
import { Form } from "../../basedComponents/Form/Form";
import { DropDownMenu } from "../../ui/DropDownMenu/DropDownMenu";
import { Button } from "../../ui/Button/Button";
import { FLOAT_TYPE_REGEX, INT_TYPE_REGEX } from "../../constants/Regex";
import { FormValidation } from "../../types/Form/FormValidationTypes";
import style from './AddRecordForm.module.scss';
import { SelectList } from "../../ui/SelectList/SelectList";

interface FormFieldAddRecord {
  name: string,
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

export interface AddRecordFormProps {
  formData: FormData,
  fields: FormFieldAddRecord[],
  types: FormType[],
  onSubmit: (data: FormData) => void;
  validations: FormValidation,
  onChooseType: (type: FormType, field: FormFieldAddRecord) => void,
  onChange: (field: string, value: string)=> void,
}


export const AddRecordForm = (props: AddRecordFormProps) => {
  const { fields, types, onSubmit, onChooseType, validations, formData, onChange } = props;

  const onClickType = (type: FormType, field: FormFieldAddRecord) => {
    onChooseType(type, field);
  }

  const chooseType = fields.map((field)=>{
        const typesElements = types.map((type)=>{
          console.log(field.type, type.type)
          return <Button key = {`TYPE_${field.name}_${type.type}}`}isChoosen={field.type == type.type} onClick={()=>onClickType(type,field)}>{type.type}</Button>
        })
        return <DropDownMenu menuTitle={field.name} menusElements={typesElements} key={`DROPDOWN_${field.name}`} uniqueKey={field.name}/>
      })

  return (
    <>
      <h2 className={style.title}>Добавить запись</h2>
      <h3 className={style.titleTypes}>Типы полей</h3>
      <section className={style.chooseTypesSection}>
      {chooseType}
      </section>
      <Form onChange={onChange}values={formData} buttonSubmitText={'Добавить'} onSubmit={onSubmit} fields={fields.map((field)=>field.name)} validations={validations}>
      </Form>
    </>
  )
}
