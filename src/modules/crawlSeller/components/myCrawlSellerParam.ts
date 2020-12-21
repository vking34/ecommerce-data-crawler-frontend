import { crawlSellerStore } from '../crawlSellerStore';
// import { Moment } from '../../../common/Moment';

export default class myCrawlSellerParam extends URLSearchParams {
  constructor(search: String | null){
    super(search + "");
    Object.setPrototypeOf(this, myCrawlSellerParam.prototype)
  }

  get getState(): String{
    let state: any = this.get('state') || null;
    if(state === undefined || state == null){
      state = "all";
    }
    return state;
  }

}
