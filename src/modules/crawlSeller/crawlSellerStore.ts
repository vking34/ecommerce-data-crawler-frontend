/* eslint-disable array-callback-return */
import { observable } from 'mobx';
import { Moment } from '../../common/Moment';

class CrawlSellerStore {
  @observable data: any = [];
  @observable market: string = "Total Market";
  @observable state: string = "STATE";
  @observable currentPage: number = 1;
  @observable totalPage: number = 1;
  @observable pageSize: number = 15;
  @observable selectedRowKeys: any = [];
  @observable totalShops: number = 0;
  getDate = (data: any) => {
    data.map((item: any, key: number) => {
      item.key = item._id;
      // var dateStr = JSON.parse("\"2014-01-01T23:28:56.782Z\"");
      var str = "\"" + item.updated_at + "\"";
      var dateStr = JSON.parse(str);
      var date = new Date(dateStr);
      item.updated_at = Moment.getDate(date.getTime(),"dd/mmyyyy");
    })
  }
}

export const crawlSellerStore = new CrawlSellerStore();