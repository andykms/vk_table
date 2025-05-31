import { useState } from 'react';
import styles from './Field.module.scss';

export interface FieldProps {
  value: string;
  onClick: () => void;
}

export const Field = (props: FieldProps) => {
  const { value, onClick } = props;
  
  return (
    <div className={styles.field}>
      <p className={styles.label}> {value} </p>
    </div>
  )
}