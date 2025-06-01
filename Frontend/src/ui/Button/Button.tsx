import style from './Button.module.scss';
import clsx from 'clsx';


export interface ButtonProps {
  children: string;
  onClick: (evt: React.MouseEvent) => void;
  disabled?: boolean;
  isChoosen?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = (props: ButtonProps) => {
  const { children, onClick, disabled, isChoosen, type } = props;
  let isDisabled = disabled ? disabled : false;
  return (
    <button type={type} className={clsx(style.button, isChoosen && style.choosenButton)} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  );
};