import { observable } from "mobx";

class CommonStore {
  @observable namePage: String = "Home";
  @observable showFormLogin: boolean = true;
  
  setNamePage = (str: String) => {
    this.namePage = str;
  }
  checkshowFormLogin(){
    this.showFormLogin = !this.showFormLogin;
  }

}

export const commonStore = new CommonStore();