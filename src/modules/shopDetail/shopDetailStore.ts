// import { error } from './../../common/notify/index';
import { validate } from './../../common/Handler';
import { observable } from 'mobx';


class ShopDetailStore {
  endDate(arg0: string, startDate: (arg0: string, startDate: any, arg2: string, endDate: any) => void, arg2: string, endDate: any) {
    throw new Error("Method not implemented.");
  }
  startDate(arg0: string, startDate: any, arg2: string, endDate: any) {
    throw new Error("Method not implemented.");
  }
  @observable edit: boolean = false; 
  @observable infoSeller : any = {};
  @observable errorInfo: any = {};

  editDetail = () => {
    this.edit = !this.edit;
  }

  changeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    var { name, value} = e.target;
    this.infoSeller = {
      ...this.infoSeller,
      [name]: value,
    }
    validate(name, value, this.errorInfo);
  }
}

export const shopDetailStore = new ShopDetailStore(); 