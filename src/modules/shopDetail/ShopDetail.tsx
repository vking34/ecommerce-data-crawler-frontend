import React, { Component } from 'react'
import { observer } from "mobx-react"

import {shopDetailStore} from "./shopDetailStore";
import myShopDetailParam from "./components/myShopDetailParam";
import { Button } from 'antd'
import About from "./components/About";
import Product from "./components/Product";
// import "./style.css";
import { callApi } from './../../utils/callAPI';


@observer
export default class ShopDetail extends Component<any> {

  componentDidMount() {
    this.requestAPI();
  }
  
  requestAPI = async () => {
    if(this.props.location.search){ 
      const params = new myShopDetailParam(this.props.location.search)
      shopDetailStore.id = params.getId;
      const resultApi = await callApi(
        `v1/crawlers/shopee/shops/raw`,
        "GET",
        {},
        false
        );
      if (resultApi.result.status === 200) {
        shopDetailStore.data = resultApi.result.data.data;
        // console.log("data : ", resultApi.result.data.pagination.total_elements);
      }
    }
    // else {
    //   this.props.history.push(`/crawl-seller`)  
    // }
  }

  render() {
    return (
      <React.Fragment>
        <div className="nav-option" style={{backgroundColor: "#fff"}}>
          <div className={shopDetailStore.showAbout ? "about active" : "about" } onClick={() => shopDetailStore.showAbout = true}>ABOUT</div>
          <div className={shopDetailStore.showAbout ? "product" : " product active" }onClick={() => shopDetailStore.showAbout = false}>PRODUCT</div>
          {shopDetailStore.showAbout && 
            <Button type="primary" className="approve-btn-detail">
              Approve Shop
            </Button>
          }
        </div>
        <div className="info-main shop-detail" >
        {shopDetailStore.showAbout ? 
          <About />
          :
          <Product />
        }

        </div>
      </React.Fragment>
    )
  }
}
