import { Button, Input, message, Upload } from 'antd'
  import { observer } from 'mobx-react'
import React, { Component, createRef } from 'react'

import "./style.scss"
import {crawlingStore} from "./crawlingStore"; 
import { callApi } from '../../utils/callAPI';
import { notify } from '../../common/notify/NotifyService';
import { UploadOutlined } from '@ant-design/icons';
import { menuStore } from '../menu/menuStore';

interface CrawlingProps {
  history: { push: (path: string) => any };
  location: { search: string };
}

@observer
export default class Crawling extends Component<CrawlingProps, any> {
  private readonly inputRef: React.RefObject<any> = createRef();
  private data: string[] = [];
  componentDidMount() {
    this.inputRef.current!.focus();
    menuStore.changeOption("1Crawling");
  }

  dataSend = (data : any) => {
    for (const shop in data) {
      this.data.push(data[shop]);
     };
  }
  requestAPI = async () => {
    this.dataSend(crawlingStore.shops); 
    crawlingStore.dataToSend();
    // console.log("data : ", this.data);
    // console.log("shop : ", crawlingStore.data);
    // return;
    // if(this.props.location.search){
    //   const params = new myCrawlerSellerParam(this.props.location.search)
    //   crawlingStore.state = params.getState;
    const resultApi = await callApi(
      `v1/crawlers/shopee/shops`,
      "POST",
      {
        shops: this.data
        // crawlingStore.data,
      },
      false
      );
    if (resultApi.result.status === 200) {
      // crawlingStore.getDate(resultApi.result.data.data);
      crawlingStore.data = resultApi.result.data.data;
      // crawlingStore.totalPage = resultApi.result.data.pagination.total_elements / crawlingStore.pageSize;
      // console.log("data : ", resultApi.result.data);
      // this.props.history.push("/crawling-addition");
      notify.show(`Crawling shops ... ! `, "success");
      crawlingStore.cancel();
    }
  };
  change = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key ==="Enter"){
      this.handleAddItem();
      this.inputRef.current!.focus();
    }
  }
  handleAddItem = () => {
    // console.log("map : ");
    crawlingStore.items ++;
    crawlingStore.itemsMap.push(crawlingStore.items);
    this.inputRef.current!.focus();
  }
  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name , value} = event.target; 
    crawlingStore.updateShops(name, value);
    // console.log("update : ", name , " : ", value);
    // console.log("shop text : ", crawlingStore.shops[1]); 
  }
  propsUpload: any = {
    name: 'file',
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  render() {
    return (
      <React.Fragment>  
        <Upload {...this.propsUpload} className="load-file">
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        {crawlingStore.itemsMap.map((item, index) => {
          return (
            <div className="item" key={index} style={{width : "70%"}}>
              {/* {item} - {crawlingStore.shops[item]} */}
              {index + 1 === crawlingStore.itemsMap.length ? 
                <Input name={item.toString()} placeholder="https:// ..." style={{margin: "10px "}} 
                      onKeyDown={this.change} ref={this.inputRef} onChange={this.handleInput} value= {crawlingStore.shops[item]} />
                :
                <Input name={item.toString()} placeholder="https:// ..." style={{margin: "10px "}} onKeyDown={this.change} 
                        onChange={this.handleInput} value= {crawlingStore.shops[item]}  />
              }
              <i className="fas fa-minus-circle" style={{color: "#f54b24", fontSize: "27px"}} onClick={() => crawlingStore.deletePropShops(item)}></i> 
            </div>
          )
        })}
        <Button type="primary" size={"large"} style={{margin : "10px", width: "99px"}} onClick={this.handleAddItem}>
            Add
        </Button>
          <hr></hr>
        <Button type="primary" size={"large"} style={{margin : "10px", width: "99px"}} onClick={this.requestAPI} disabled={crawlingStore.valid}>
          Save
        </Button>
        <Button type="primary" size={"large"} style={{margin : "10px", width: "99px", backgroundColor: "#f7a922"}} onClick={crawlingStore.cancel}>
          Cancel
        </Button>
      </React.Fragment> 
    )
  }
}
