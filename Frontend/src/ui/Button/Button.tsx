import style from './Button.module.scss';

export interface ButtonProps {
  children: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
  const { children, onClick, disabled } = props;
  let isDisabled = disabled ? disabled : false;
  return (
    <button className={style.button} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  );
};