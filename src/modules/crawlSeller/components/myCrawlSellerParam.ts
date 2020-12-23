/* eslint-disable @typescript-eslint/no-unused-vars */
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
  get getPage(): number{
    let page: any = this.get("page") || null ;
    if(page === undefined || page == null){
      page = 1;
    }
    return parseInt(page);
  }
  get getLimit(): number{
    let limit: any = this.get("limit") || null ;
    if(limit === undefined || limit == null){
      limit = 1;
    }
    return parseInt(limit);
  }

}
