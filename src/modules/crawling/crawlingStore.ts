import { observable } from 'mobx';

class CrawlingStore {
  @observable itemsMap: number[] = [1];
  @observable items: number = 1;
  @observable shops: any = {};
  @observable data: string[] = [];
  @observable valid: boolean = false;
  @observable in: string = ""
  deletePropShops = async (index: number) => {
    if(this.itemsMap.length > 1){
      this.itemsMap = await this.itemsMap.filter((item) => item !== index );
    }
    this.in = index.toString();
    await delete this.shops[this.in];
  }

  updateShops = (keyValue: string, newValue: string) => {
    this.shops = {
      ...this.shops,
      [keyValue]: newValue
    }
  }
  dataToSend = () => {
    for (const shop in this.shops) {
      this.data.push(this.shops[shop]);
     };
  }
}

export const crawlingStore = new CrawlingStore();