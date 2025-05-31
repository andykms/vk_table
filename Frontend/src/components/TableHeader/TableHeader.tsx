import { Header } from "../../ui/Header/Header";
import { DropDownMenu } from "../../ui/DropDownMenu/DropDownMenu";
import { Button } from "../../ui/Button/Button";


export interface DropMenuOption {
  name: string,
  onClick: () => void;
}

export interface DropMenu {
  menuTitle: string,
  options: DropMenuOption[];
}

export interface TableHeaderProps {
  DropMenus: DropMenu[];
}

export const TableHeader = (props: TableHeaderProps) => {
  const { DropMenus } = props;
  const  DropDownMenus = DropMenus.map((DropMenu) => {
    const Buttons = DropMenu.options.map((option) => {
        return (
          <Button onClick={option.onClick}>{option.name}</Button>
        );
      });
    return (
      <DropDownMenu menuTitle={DropMenu.menuTitle} menusElements={Buttons} />
    );
  }) 

  return (
    <Header HeaderElements={[...DropDownMenus]}/>
  );
};