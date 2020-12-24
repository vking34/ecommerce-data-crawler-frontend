import React, { Component } from 'react'
import {Button, Input} from "antd"
import {shopDetailStore} from "../shopDetailStore";
import { observer } from 'mobx-react';
import { Moment } from './../../../common/Moment';


// interface AboutProps {
//   info: any
// }

@observer
export default class About extends Component<any, any> {
  elementDetail = (title: string, content: string | string[]) => {
    // const info: any = {
      
    // }
    if(title === "Birthday" || title === "Register Time"){
      content = this.handleDate(content);
    }
    if(title === "Phone" && typeof(content) === "object"){
      content = content.join(" / "); 
    }
    return (
      <p>
        <span className="span-title"><i className="mdi mdi-crosshairs-gps"/>{title}</span> 
        { !shopDetailStore.edit ? 
          <span> {content} </span>
          :
          <Input placeholder={title} name={title} defaultValue={content} onChange={this.handleInput} />
        }
      </p>
    )
  }
  handleDate = (data: any) => {
    var str = "\"" + data + "\"";
    var dateStr = JSON.parse(str);
    var date = new Date(dateStr);
    return Moment.getDate(date.getTime(),"dd/mm/yyyy");
  }
  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name , value} = event.target; 
    shopDetailStore.updateDetailShop(name, value);
  }
  render() {
    return (
      <table className="table-about" style={{width: "100%", backgroundColor: "#fff"}}>
        <tr>
          <th style={{paddingLeft: "37px"}}>Seller Information</th>
          <th style={{textAlign: "right"}} >
          { !shopDetailStore.edit ? 
            <Button type="primary" style={{backgroundColor: "#f54b24", margin: "5px 20px"}} onClick={shopDetailStore.editDetail}>
              Edit
            </Button>
            :
            <React.Fragment>
              <Button type="primary" style={{margin: "5px 10px"}} >
                Save
              </Button>
              <Button type="primary" style={{backgroundColor: "#f54b24", margin: "5px 10px"}} onClick={shopDetailStore.editDetail}>
                Cancel
              </Button>
            </React.Fragment>
          }
          </th> 
        </tr>
        <tr>
          <td>
            {this.elementDetail("Name", this.props.info.username)}
            {this.elementDetail("Email", this.props.info.email)}
          </td>
          <td>
            {this.elementDetail("Phone", this.props.info.phone_numbers)}
            {this.elementDetail("Birthday", this.props.info.created_at)}
          </td>
        </tr>
        <tr>
          <td>
            {this.elementDetail("Shop Name", this.props.info.name)}
            {this.elementDetail("Contact Name", this.props.info.name)}
            {this.elementDetail("Email", this.props.info.email)}
          </td>
          <td>
            {this.elementDetail("Register Time", this.props.info.created_at)}
            {this.elementDetail("Shop Type", this.props.info.type)}
            {this.elementDetail("Phone", this.props.info.phone_numbers)}
          </td>
        </tr>
        <tr>
          <td>
            <p className="span-title"><i className="mdi mdi-flag-triangle"/>WAREHOUSE</p>
            {this.elementDetail("Name", this.props.info.name)}
            {this.elementDetail("Phone", this.props.info.name)}
            {this.elementDetail("Address", this.props.info.name)}
          </td>
          <td>
            <p className="span-title"><i className="mdi mdi-flag-triangle"/>RETURN</p>
            {this.elementDetail("Name", this.props.info.nameWarehouse)}
            {this.elementDetail("Phone", this.props.info.phone_numbers)}
            {this.elementDetail("Address", this.props.info.address)}
          </td>
        </tr>
      </table>
    )
  }
}
