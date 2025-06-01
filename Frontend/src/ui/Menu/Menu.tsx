import style from './Menu.module.scss';

export interface MenuProps {
  menusElements: React.ReactNode[];
  isOpen: boolean;
  uniqueKey?: string;
}

export const Menu = (props: MenuProps) => {

  const {menusElements, isOpen, uniqueKey} = props;

  return (
    isOpen ?
    <ul className={style.menu}>
      {menusElements.map((element, index) => (
        //Так как предполагается, что кнопки в меню не будут динамически меняться, то можно использовать индекс как ключ
        //Конечно, это неправильная практика, но тем самым мы избавляемся от излишних пропсов
        <li key={`#MENU${uniqueKey}#${index}`} className={style.menuContent}>
          {element}
        </li>
      ))}
    </ul> : null
  );
};