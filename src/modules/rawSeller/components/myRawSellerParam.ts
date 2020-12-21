import { rawSellerStore } from '../rawSellerStore';
// import { Moment } from '../../../common/Moment';

export default class myRawSellerParam extends URLSearchParams {
  constructor(search: String | null){
    super(search + "");
    Object.setPrototypeOf(this, myRawSellerParam.prototype)
  }

  get getState(): String{
    let state: any = this.get('state') || null;
    if(state === undefined || state == null){
      state = "all";
    }
    return state;
  }

}
