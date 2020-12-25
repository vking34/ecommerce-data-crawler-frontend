// import { rawSellerStore } from '../rawSellerStore';
// import { Moment } from '../../../common/Moment';

export default class myRawSellerParam extends URLSearchParams {
  constructor(search: String | null){
    super(search + "");
    Object.setPrototypeOf(this, myRawSellerParam.prototype)
  }

  get getPhone(): any{
    let phone: any = this.get('phone_numbers') || null;
    if(phone === undefined || phone == null){
      phone = "ALL";
    }
    return phone;
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
