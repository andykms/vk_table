import style from './Header.module.css';

export interface HeaderProps {
  logoUrl: string;
  HeaderElements: React.ReactNode[];
}

export const Header = (props: HeaderProps) => {
  const {logoUrl, HeaderElements} = props;
  return (
    <header className={style.header}>
      <img src={logoUrl} alt="Logo" />
      {HeaderElements}
    </header>
  );
};