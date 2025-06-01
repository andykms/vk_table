export interface DropMenusParams {
  menuTitle: string;
  options: DropMenuOption[];
} 

export interface DropMenuOption {
  name: string;
  onClick: () => void;
}

export const createDropMenus = (menus: DropMenusParams) => {
  return [
    {
      menuTitle: menus.menuTitle,
      options: menus.options.map(option => ({
        name: option.name,
        onClick: option.onClick
      }))
    }
  ]
}