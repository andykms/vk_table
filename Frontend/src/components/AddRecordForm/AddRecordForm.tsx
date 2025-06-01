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
    type: string,
    name: string,
  },
}

export interface AddRecordFormProps {
  formData: FormData,
  types: FormType[],
  onSubmit: (data: FormData) => void;
  validations: FormValidation,
  onChooseType: (type: FormType, field: FormFieldAddRecord) => void,
  onChange: (field: string, value: string)=> void,
}


export const AddRecordForm = (props: AddRecordFormProps) => {
  const { types, onSubmit, onChooseType, validations, formData, onChange } = props;

  const onClickType = (type: FormType, field: FormFieldAddRecord) => {
    onChooseType(type, field);
  }

  const chooseType = Object.keys(formData).map((field)=>{
        const typesElements = types.map((type)=>{
          return <Button key = {`TYPE_${formData[field].name}_${type.type}}`}isChoosen={formData[field].type == type.type} onClick={()=>onClickType(type,formData[field])}>{type.type}</Button>
        })
        return <DropDownMenu menuTitle={formData[field].name} menusElements={typesElements} key={`DROPDOWN_${formData[field].name}`} uniqueKey={formData[field].name}/>
      })

  return (
    <>
      <h2 className={style.title}>Добавить запись</h2>
      <h3 className={style.titleTypes}>Типы полей</h3>
      <section className={style.chooseTypesSection}>
      {chooseType}
      </section>
      <Form onChange={onChange} buttonSubmitText={'Добавить'} onSubmit={(data: FormData)=>onSubmit(data)} fields={formData} validations={validations}>
      </Form>
    </>
  )
}
