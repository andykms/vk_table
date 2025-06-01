import style from './Table.module.scss';
import { Field } from '../../ui/Field/Field';
import { RecordContainer } from '../../ui/RecordContainer/RecordContainer';
import { set } from 'react-hook-form';

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
  onClickRecord: (record: TableRecord) => void;
}

export const Table = (props: TableProps) => {
  const { fields, records, onClickRecord } = props;
  const fieldsNames = fields.map((field)=>field.name);
  const keys = new Set();
  let recordsList: TableRecord[] = [];
  for(let record of records) {
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
    recordsList.push(resultRecord);
  }
  return (
    <section className={style.table}>
      {
        recordsList.map((record)=>{
          const fields = Object.keys(record).map((key)=>{
            let keyComponent = `$FIELD#${record.id}#${key}#${Math.random()}`;
            if(keys.has(record.id)) {
              keyComponent+=`1`
            }
            return ({
              id: key,
              element:<Field key={keyComponent} onClick={()=>{}}value={record[key] ? record[key].toString() : "null"} />
            });
          })
          let keyComponent = `RECORD#${record.id}#${Math.random()}`;
          return <RecordContainer key={keyComponent} fields={fields} onClickContainer={()=>onClickRecord(record)}/>
      })
      }
    </section>
  );
}

