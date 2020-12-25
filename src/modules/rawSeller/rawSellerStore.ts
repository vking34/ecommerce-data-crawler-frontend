/* eslint-disable array-callback-return */
import { observable } from 'mobx';
import { Moment } from '../../common/Moment';

class RawSellerStore {
  private currentDate: Date = new Date();

  @observable state: String = "";
  @observable data: any = [];
  @observable market: string = "Total Market";
  @observable phoneNumber: string = "Phone Number";
  @observable status: string = "Status";
  @observable pageSize: number = 10;
  @observable totalPage: number = 1;
  @observable currentPage: number = 1;
  @observable endDate: string = Moment.getDate(this.currentDate.getTime(),"yyyy-mm-dd");
  @observable startDate: string = Moment.getDate(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getTime(), "yyyy-mm-dd");
  @observable selectedRowKeys: any = [];
  @observable phone: any = "ALL";

  getDate = (data: any) => {
    data.map((item: any, key: number) => {
      // var dateStr = JSON.parse("\"2014-01-01T23:28:56.782Z\"");
      item.key = item._id;
      var str = "\"" + item.updated_at + "\"";
      var dateStr = JSON.parse(str);
      var date = new Date(dateStr);
      item.updated_at = Moment.getDate(date.getTime(),"dd/mm/yyyy");
    })
  }
}

export const rawSellerStore = new RawSellerStore();