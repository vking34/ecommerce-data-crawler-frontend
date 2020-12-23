import React, { Component } from 'react'
import {Button, Input} from "antd"
import {shopDetailStore} from "../shopDetailStore";
import { observer } from 'mobx-react';


interface AboutProps {
  info: any
}

@observer
export default class About extends Component<any, any> {
  elementDetail = (title: string, content: string) => {
    const info: any = {
      
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
  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name , value} = event.target; 
    shopDetailStore.updateDetailShop(name, value);
  }
  render() {
    return (
      <table style={{width: "100%"}}>
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
                {this.elementDetail("Full Name", "null")}
                {this.elementDetail("Email", "null")}
              </td>
              <td>
                {this.elementDetail("Phone", "null")}
                {this.elementDetail("Birthday", "null")}
              </td>
            </tr>
            <tr>
              <td>
                {this.elementDetail("Shop Name", "null")}
                {this.elementDetail("Contact Name", "null")}
                {this.elementDetail("Email", "null")}
              </td>
              <td>
                {this.elementDetail("Register Time", "null")}
                {this.elementDetail("Shop Type", "null")}
                {this.elementDetail("Phone", "null")}
              </td>
            </tr>
            <tr>
              <td>
                <p className="span-title"><i className="mdi mdi-flag-triangle"/>WAREHOUSE</p>
                {this.elementDetail("Name", "null")}
                {this.elementDetail("Phone", "null")}
                {this.elementDetail("Address", "null")}
              </td>
              <td>
                <p className="span-title"><i className="mdi mdi-flag-triangle"/>RETURN</p>
                {this.elementDetail("Name", "null")}
                {this.elementDetail("Phone", "null")}
                {this.elementDetail("Address", "null")}
              </td>
            </tr>
          </table>
    )
  }
}
