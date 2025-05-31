import style from './Header.module.scss';

export interface HeaderProps {
  HeaderElements: React.ReactNode[];
}

export const Header = (props: HeaderProps) => {
  const { HeaderElements} = props;
  return (
    <header className={style.header}>
      {HeaderElements}
    </header>
  );
};