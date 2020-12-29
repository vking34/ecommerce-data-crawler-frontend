import React, { Component } from 'react'
import {AutoComplete, Button, Input} from "antd"
import {shopDetailStore} from "../shopDetailStore";
import { observer } from 'mobx-react';
import { Moment } from './../../../common/Moment';
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import TextArea from 'antd/lib/input/TextArea';
import { callApi } from './../../../utils/callAPI';

@observer
export default class About extends Component<any, any> {
  private listPhone: any = [] ;
  componentWillUnmount() {
    this.listPhone = []
  }
  elementDetail = (title: string, content: any, name: string) => {
    if(title === "Birthday" || title === "Register Time"){
      content = this.handleDate(content);
    }
    return (
      <React.Fragment>
        {title !== "Description" ? <p>
          <span className="span-title"><i className="mdi mdi-crosshairs-gps"/>{title}</span> 
          { shopDetailStore.edit && title !== "Register Time" ? 
            <Input placeholder={title} name={name} defaultValue={content} onChange={this.handleInput} />
            :
            <span> {content} </span> 
          }
        </p> :
        <p> 
          <span className="span-title"><i className="mdi mdi-crosshairs-gps"/>{title}</span> 
          { shopDetailStore.edit ?
            <TextArea value={content} style={{minHeight: "200px", width: "70%", margin: "10px"}} name={name} onChange={this.handleInput}/>
          :
            <TextArea value={content} style={{minHeight: "200px", width: "70%", margin: "0px"}} readOnly/>
          }
        </p>
        }
      </React.Fragment>
    )
  }
  elementMainPhone = (title: string, content: any, name: string) => { 
    this.listPhone = [];
    shopDetailStore.info?.phone_numbers !== undefined && shopDetailStore.info?.phone_numbers.map((item: any, index: any) => {
      this.listPhone.push({
        value: item
      })
    })
    return (
      <p>
        <span className="span-title"><i className="mdi mdi-crosshairs-gps"/>{title}</span> 
          { shopDetailStore.edit ? 
            <Input.Group compact style={{margin: "10px", width: "70%"}} >
              <AutoComplete
                value= {content}
                onChange={this.handleInputMainPhone}
                style={{ width: '70%' }}
                placeholder="main phone"
                options={this.listPhone}
                // options={[{ value: 'text 1' }, { value: 'text 2' }]}
              />
            </Input.Group> 
            :
            <span> {content} </span> 
          }
      </p>
    )
  }
  elementListPhone = (title: string, content: any, name: string) => {
    return (
      <React.Fragment>
        <p>
          <span className="span-title"><i className="mdi mdi-crosshairs-gps"/>{title}</span> 
          <div className="dropdown show-dropdown option-main open">
                <span data-toggle="dropdown" aria-expanded="true">
                  <i className="fas fa-phone" style={{margin: "7px 17px", color: "#f54b24"}}></i>
                  <span>
                  { shopDetailStore.info?.phone_numbers !== undefined && shopDetailStore.info?.phone_numbers[0]} &nbsp;
                    <i className="fas fa-angle-down" />
                  </span>
                </span>
                <ul className="dropdown-menu">
                { shopDetailStore.info?.phone_numbers !== undefined && shopDetailStore.info?.phone_numbers.map((phone_number: string, index: number) => {
                  return (
                      <li key={index}>
                        <i className="fas fa-phone" style={{margin: "7px 17px", color: "#f54b24"}}></i>
                        <span>{phone_number}</span>
                      </li>
                  );
                })}
                </ul>
              </div>
        </p>
      </React.Fragment>
    )
  }
  handleDate = (data: any) => {
    var str = "\"" + data + "\"";
    var dateStr = JSON.parse(str);
    var date = new Date(dateStr);
    return Moment.getDate(date.getTime(),"dd/mm/yyyy");
  }
  handleInput = (event: any) => {
    const { name , value} = event.target; 
    shopDetailStore.updateDetailShop(name, value);
  }
  handleInputMainPhone = (e: any) => {
    shopDetailStore.updateDetailShop("phone_number", e);
  }
  saveChangeInfo = async () => {
    const resultApi = await callApi(
      `v1/crawlers/shopee/converted-shops/${shopDetailStore.id}`,
      "PUT",
      {
        "phone_numbers": shopDetailStore.info?.phone_numbers,
        "updatable": shopDetailStore.info?.updatable,
        "phone_number": shopDetailStore.info?.phone_number,
        "email": shopDetailStore.info?.email,
        "contact_name": shopDetailStore.info?.contact_name,
        "total_products": shopDetailStore.info?.total_products,
        "username": shopDetailStore.info?.username,
        "name": shopDetailStore.info?.name,
        "img_avatar_url": shopDetailStore.info?.img_avatar_url,
        "img_cover_url": shopDetailStore.info?.img_cover_url,
        "description": shopDetailStore.info?.description,
        "state": shopDetailStore.info?.state
      },
      false
      )
    if (resultApi.result.status === 200) {
      const resultApiInfo = await callApi(
        `v1/crawlers/shopee/converted-shops/${shopDetailStore.id}`,
        "GET",
        {},
        false
        )
      if (resultApiInfo.result.status === 200) {
        shopDetailStore.info = resultApiInfo.result.data;
      }
      shopDetailStore.editDetail();
    }
  }
  cancelEditDetail = async () => {
      const resultApi = await callApi(
        `v1/crawlers/shopee/converted-shops/${shopDetailStore.id}`,
        "GET",
        {},
        false
        )

      if (resultApi.result.status === 200) {
        shopDetailStore.info = resultApi.result.data;
      }
    shopDetailStore.editDetail();
  }
  render() {
    return (
      <table className="table-about about-product">
        <tr>
          <th style={{paddingLeft: "37px"}}>Seller Information</th>
          <th style={{textAlign: "right"}} >
          { !shopDetailStore.edit ? 
            <Button type="primary" style={{backgroundColor: "#f54b24", margin: "5px 20px"}} onClick={shopDetailStore.editDetail}>
              Edit
            </Button>
            :
            <React.Fragment>
              <Button type="primary" style={{margin: "5px 10px"}} onClick={this.saveChangeInfo} >
                Save
              </Button>
              <Button type="primary" style={{backgroundColor: "#f54b24", margin: "5px 10px"}} onClick={this.cancelEditDetail}>
              {/* <Button type="primary" style={{backgroundColor: "#f54b24", margin: "5px 10px"}} onClick={shopDetailStore.editDetail}> */}
                Cancel
              </Button>
            </React.Fragment>
          }
          </th> 
        </tr>
        <tr>
          <td>
            {this.elementDetail("Name", shopDetailStore.info?.username, "username")}
            {this.elementDetail("Shop Name", shopDetailStore.info?.name, "name")}
            {this.elementDetail("Email", shopDetailStore.info?.email, "email")}
            {this.elementListPhone("Phone", shopDetailStore.info?.phone_numbers, "phone_numbers")}
            {/* {this.elementDetail("Phone", shopDetailStore.info?.phone_numbers, "phone_numbers")} */}
            {this.elementMainPhone("Main Phone", shopDetailStore.info?.phone_number, "phone_number")}
            {this.elementDetail("Description", shopDetailStore.info?.description, "description")}
            {this.elementDetail("Register Time", shopDetailStore.info?.created_at, "created_at")}
          </td>
          {/* <td>
          </td> */}
        </tr>
        {/* <tr>
          <td>
            {this.elementDetail("Contact Name", shopDetailStore.info?.name)}
            {this.elementDetail("Email", shopDetailStore.info?.email)}
          </td>
          <td>
            {this.elementDetail("Shop Type", shopDetailStore.info?.type)}
            {this.elementDetail("Phone", shopDetailStore.info?.phone_numbers)}
          </td>
        </tr> */}
        {/* <tr>
          <td>
            <p className="span-title"><i className="mdi mdi-flag-triangle"/>WAREHOUSE</p>
            {this.elementDetail("Name", shopDetailStore.info?.name)}
            {this.elementDetail("Phone", shopDetailStore.info?.name)}
            {this.elementDetail("Address", shopDetailStore.info?.name)}
          </td>
          <td>
            <p className="span-title"><i className="mdi mdi-flag-triangle"/>RETURN</p>
            {this.elementDetail("Name", shopDetailStore.info?.nameWarehouse)}
            {this.elementDetail("Phone", shopDetailStore.info?.phone_numbers)}
            {this.elementDetail("Address", shopDetailStore.info?.address)}
          </td>
        </tr> */}
      </table>
    )
  }
}
