import style from './RecordContainer.module.scss';

export interface RecordContainerField {
  id: string|null;
  element: React.ReactNode;
}

export interface RecordContainerProps {
  fields: RecordContainerField[];
  onClickContainer?: () => void;
}

export const RecordContainer = (props: RecordContainerProps) => {
  const { fields, onClickContainer } = props;
  return (
    <section className={style.recordContainer} onClick={onClickContainer}>
      {fields.map((field) => (
        field.id !== null ?
        <div key={field.id} className={style.field}>
          {field.element}
        </div> : null
      ))}
    </section>
  );
};