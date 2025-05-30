import { useState } from 'react';
import styles from './Field.module.scss';

export interface FieldProps {
  value: string;
  onClick: () => void;
}

export const Field = (props: FieldProps) => {
  const { value } = props;
  
  return (
    <button className={styles.field}>
      <span className={styles.label}>{value}</span>
    </button>
  )
}