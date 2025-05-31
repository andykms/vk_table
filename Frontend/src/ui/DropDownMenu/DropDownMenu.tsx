import { Menu } from "../Menu/Menu";
import { Button } from "../Button/Button";
import { useState } from "react";
import style from './DropDownMenu.module.scss';


export interface DropDownMenuProps {
  menusElements: React.ReactNode[];
  menuTitle: string;
}

export const DropDownMenu = (props: DropDownMenuProps) => {
  const { menusElements, menuTitle } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
  <div className={style.DropDownMenu}>
    <Button onClick={() => setIsOpen(!isOpen)}>{menuTitle}</Button>
    <div className={style.menuContainer}>
      <Menu menusElements={menusElements} isOpen={isOpen} />
    </div>
  </div>
  );
};