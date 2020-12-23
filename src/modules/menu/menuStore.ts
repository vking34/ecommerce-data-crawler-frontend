import { observable } from 'mobx';


class MenuStore {
  @observable showMenu: boolean = false;

  changeShowMenu = () => {
    this.showMenu = !this.showMenu;
  }
}

export const menuStore = new MenuStore();