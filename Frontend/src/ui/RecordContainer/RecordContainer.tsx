import style from './RecordContainer.module.scss';

export interface RecordContainerField {
  id: string;
  element: React.ReactNode;
}

export interface RecordContainerProps {
  fields: RecordContainerField[];
}

export const RecordContainer = (props: RecordContainerProps) => {
  const { fields } = props;
  return (
    <section className={style.recordContainer}>
      {fields.map((field) => (
        <div key={field.id} className={style.field}>
          {field.element}
        </div>
      ))}
    </section>
  );
};