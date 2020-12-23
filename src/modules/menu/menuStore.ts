import { observable } from 'mobx';


class MenuStore {
  @observable showMenu: boolean = false;
  @observable option: string = "1Crawl";

  changeOption = (str: string) => {
    this.option = str;
  }
  changeShowMenu = () => {
    this.showMenu = !this.showMenu;
  }
}

export const menuStore = new MenuStore();