import style from './Button.module.scss';
import clsx from 'clsx';


export interface ButtonProps {
  children: string;
  onClick: (evt: React.MouseEvent) => void;
  disabled?: boolean;
  isChoosen?: boolean;
  isLikePrint?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = (props: ButtonProps) => {
  const { children, onClick, disabled, isChoosen, type, isLikePrint } = props;
  let isDisabled = disabled ? disabled : false;
  return (
    <button type={type} className={clsx(style.button, isChoosen ? style.choosenButton : isLikePrint && style.print)} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  );
};