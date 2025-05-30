import style from './Table.module.scss';
import { Field } from '../../ui/Field/Field';
import { RecordContainer } from '../../ui/RecordContainer/RecordContainer';


//import { getRecords } from '../../types/TableReducer/TableSlice';
//import { UseSelector } from 'react-redux';

export interface TableField {
  id: string;
  name: string;
}

export interface TableRecord {
  id: string,
  [key: string]: string|number|boolean|null,
}

export interface clickedRecordField {
  id: string;
  name: string;
}

export interface TableProps {
  fields: TableField[];
  records: TableRecord[];
  onClick: (recordField: clickedRecordField) => void;
}

export const Table = (props: TableProps) => {
  const { fields, records, onClick } = props;
  const fieldsNames = fields.map((field)=>field.name);
  const recordsList = records.map((record)=>{
    let resultRecord: TableRecord = {
      id: record.id,
    };
    for(let name of fieldsNames) {
      if(name in record) {
        resultRecord[name] = record[name];
      } else {
        resultRecord[name] = "null";
      }
    }
    return resultRecord;
  })
  
  return (
    <section className={style.table}>
      {
        recordsList.map((record)=>{
          const fields = Object.keys(record).map((key)=>{
            const onClickField = () => {
              onClick({id: record.id, name: key});
            };
            return ({
              id: key,
              element:<Field key={key} onClick={onClickField}value={record[key] ? record[key].toString() : "null"} />
            });
          })
          return <RecordContainer key={record.id} fields={fields} />
        })
      }
    </section>
  );
}

