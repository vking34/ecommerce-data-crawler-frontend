import { observable } from 'mobx';
import { Moment } from '../../common/Moment';

class CrawlSellerStore {
  @observable state: String = "";
  @observable data: any = [];
  @observable market: string = "Total Market";
  @observable status: string = "Status";
  @observable currentPage: number = 1;
  @observable totalPage: number = 1;
  @observable pageSize: number = 15;
  
  getDate = (data: any) => {
    data.map((item: any, key: number) => {
      // var dateStr = JSON.parse("\"2014-01-01T23:28:56.782Z\"");
      var str = "\"" + item.updated_at + "\"";
      // console.log(str);
      var dateStr = JSON.parse(str);
      var date = new Date(dateStr);
      item.updated_at = Moment.getDate(date.getTime(),"dd/mmyyyy");
    })
  }
}

export const crawlSellerStore = new CrawlSellerStore();