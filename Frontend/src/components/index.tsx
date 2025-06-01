import { RootState, AppDispatch } from "../services/store"
import React, { useEffect, useState, useRef, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTenTableRecords, getTableFields } from "../types/TableActions/TableActions";
import { getRecords, getFields, getRecordsCount, getHasMore } from "../types/TableReducer/TableSlice";
import { ApiRecord } from "../types/API/records";
import { ApiField } from "../types/API/fields";
import { ApiType } from "../types/API/types";
import { Loader } from "../ui/Loader/Loader";
import { InfiniteTable } from "./InfiniteTable/InfiniteTable";
import { TableHeader } from "./TableHeader/TableHeader";
import { createDropMenus } from "../utils/createDropMenus";
import { Modal } from "../ui/Modal/Modal";
import { AddRecordForm } from "./AddRecordForm/AddRecordForm";
import { createValidationsRules } from "../utils/createValidationsRules";
import { FormFieldPayload } from "../types/Form/FormFieldPayload";
import { FormFieldAddRecord } from "../types/Form/FormFieldAddRecord";
import { FormValidation } from "../types/Form/FormValidationTypes";
import { getTypes } from "../types/TableReducer/TableSlice";
import { getTableTypes } from "../types/TableActions/TableActions";
import { FormData } from "../basedComponents/Form/Form";
import { ApiTypes } from "../types/API/types";
import { addTableRecord } from "../types/TableActions/TableActions";
import { getLoad } from "../types/TableReducer/TableSlice";
import { getFormAddRecord } from "../types/TableReducer/TableSlice";
import { FormAddRecord } from "../types/TableReducer/TableSlice";
import { FormRecordData } from "../types/TableReducer/TableSlice";
import { tableActions } from "../types/TableReducer/TableSlice";


export const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  let RecordsCount = useSelector<RootState, number>(getRecordsCount);
  const Records = useSelector<RootState, ApiRecord[]>(getRecords);
  const Fields = useSelector<RootState, ApiField[]>(getFields);
  const hasMore = useSelector<RootState, boolean>(getHasMore);
  const Types = useSelector<RootState, ApiType[]>(getTypes);
  const isLoad = useSelector<RootState, boolean>(getLoad);
  const formAddRecordData = useSelector<RootState, FormRecordData>(getFormAddRecord);
  const [isOpenModal, setOpenModal] = useState(false);
  const [validations, setValidations] = useState<FormValidation>({});
  const [modalContent, setModalContent] = useState(<></>);
  const [formFields, setFormFields] = useState<FormFieldAddRecord[]>([]);

  useEffect(() => {
    dispatch(getTableTypes())
  }, [dispatch])

  useEffect(() => {
    if(Types && Types.length > 0) {
      setFormFields(Fields.map((field) => {
        return {
        type: Types[0].type,
        name: field.name,
      }}).filter((field) => field.name !== "id"));
      setValidations(createValidationsRules(formFields));
      const formData: FormRecordData = {};
      Fields.forEach((field) => {
        formData[field.name] = {
          type: Types[0].type,
          value: "",
        }
      });
      dispatch(tableActions.setFormAddRecord(formData))
    }
  }, [Fields])


  useEffect(() => {
    setValidations(createValidationsRules(formFields));
  }, [formFields]);

  const onCloseModal = () => {
    setOpenModal(false);
  }

  useEffect(() => {
    dispatch(getTableFields());
  }, [dispatch])

  useEffect(() => {
    dispatch(getTenTableRecords("0"));
    return ()=>{

    }
  }, [dispatch])


  const onChooseType = (type: ApiType, field: FormFieldAddRecord) => {
    setFormFields(prevFields => 
    prevFields.map(f => 
      f.name === field.name 
        ? { ...f, type: type.type } // Создаем новый объект!
        : f
    )
  );
  }

  const onSubmitAddRecord= (data: FormData) => {
    console.log(data);
    const newRecord: ApiRecord = {
      id:(RecordsCount + 1).toString(),
      ...data
    };
    dispatch(addTableRecord(newRecord));
  }

  const onClickRecord = (record: ApiRecord) => {
    
  };

  const onClickAddRecord = () => {
    setOpenModal(true);
  }


  const loadMore = (start: string) => {
    dispatch(getTenTableRecords(start));
  }
  const inputRef = useRef<HTMLInputElement>(null);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Uraura')
    if(inputRef.current)  {
      inputRef.current.value = e.target.value;
    }
  }
  const onChangeFormAddRecord = (field: string, value: string) => {
    dispatch(tableActions.setFormAddRecordValue({
      name: field,
      value: value,
    }))
  }

  return (
    <>
      <Modal isOpen={isOpenModal} onClose={onCloseModal} content={<AddRecordForm onChange={onChangeFormAddRecord} formData= {formAddRecordData} onSubmit={onSubmitAddRecord} validations={validations} fields={formFields} types={Types} onChooseType={onChooseType}/>}>
      </Modal>
      <TableHeader DropMenus={createDropMenus({
        menuTitle: "Опции",
        options: [
          Fields && Types ? {
            name: "Добавить запись",
            onClick: onClickAddRecord
          } : {
            name: "Добавить запись",
            onClick: ()=>{},
          }
        ]
      })}/>
      <InfiniteTable isLoad = {isLoad} hasMore= {hasMore} records={Records} fields={Fields} onLoadMore={loadMore} loader={<Loader/>} onClickRecord={onClickRecord}/>
    </>
  )
}