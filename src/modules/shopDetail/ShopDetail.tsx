import React, { Component } from 'react'
import { observer } from "mobx-react"

import {shopDetailStore} from "./shopDetailStore";
import myShopDetailParam from "./components/myShopDetailParam";
import { Button } from 'antd'
import About from "./components/About";
import Product from "./components/Product";
// import "./style.css";
import { callApi } from './../../utils/callAPI';
import { notify } from './../../common/notify/NotifyService';

@observer
export default class ShopDetail extends Component<any> {
  componentDidMount() {
    this.requestAPI();
    shopDetailStore.showAbout = true;
  }
  requestAPI = async () => {
    if(this.props.location.search){ 
      const params = new myShopDetailParam(this.props.location.search)
      shopDetailStore.id = params.getId;
      if(shopDetailStore.id === ""){
        this.props.history.push(`/crawled-sellers`) ;
      } 
      const resultApi = await callApi(
        `v1/crawlers/shopee/converted-shops/${shopDetailStore.id}`,
        "GET",
        {},
        false
        )

      if (resultApi.result.status === 200) {
        shopDetailStore.data = resultApi.result.data;
        shopDetailStore.info = resultApi.result.data;
        // console.log("data : ", resultApi.result.data);
      }
    }
    else {
      this.props.history.push(`/crawled-sellers`)  ;
    }
  }
  showProducts = async () => {
    shopDetailStore.showAbout = false;
  }
  handleApprove = async () => {
    const resultApi = await callApi(
      `v1/crawlers/shopee/approved-shops`,
      "POST",
      {"shop_ids": shopDetailStore.id},
      false
      );
    if (resultApi.result.status === 200) {
      notify.show(" Approved " , "success")
      // console.log("data : ", resultApi.result.data.pagination.total_elements);
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="nav-option" style={{backgroundColor: "#fff"}}>
          <div className={shopDetailStore.showAbout ? "about active" : "about" } onClick={() => shopDetailStore.showAbout = true}>ABOUT</div>
          <div className={shopDetailStore.showAbout ? "product" : " product active" } onClick={this.showProducts}>PRODUCT</div>
 
          {shopDetailStore.showAbout && 
            <React.Fragment>
              <Button type="primary" className="btn-back" onClick={() => this.props.history.push("/crawled-sellers")}>
                Back
              </Button>
              <Button type="primary" className="approve-btn-detail" onClick={this.handleApprove}>
                Approve Shop
              </Button>
            </React.Fragment>
          }
        </div>
        <div className="info-main shop-detail" >
        {shopDetailStore.showAbout ? 
          <About info={shopDetailStore.info} />
          :
          <Product infoProducts = {shopDetailStore.infoProducts} id={shopDetailStore.id} history={this.props.history}/>
        }

        </div>
      </React.Fragment>
    )
  }
}
