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
export interface TableProps {
  fields: TableField[];
  records: TableRecord[];
}

export const Table = (props: TableProps) => {

  const { fields, records } = props;
  return (
    <div className={style.table}>
    </div>
  );
}

