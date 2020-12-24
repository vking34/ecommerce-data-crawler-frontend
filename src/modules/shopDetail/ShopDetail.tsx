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
    var url: string = "";
    if(this.props.location.search){ 
      const params = new myShopDetailParam(this.props.location.search)
      shopDetailStore.id = params.getId;
      if(shopDetailStore.id === ""){
        this.props.history.push(`/crawl-seller`) ;
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
      this.props.history.push(`/crawl-seller`)  ;
    }
  }
  showProducts = async () => {
    shopDetailStore.showAbout = false;
    const resultApi = await callApi(
      // `v1/crawlers/shopee/converted-shops/${shopDetailStore.id}`,
      `v1/crawlers/shopee/converted-shops/SHOPEE.107287927/products?page=1&limit=10`,
      // `v1/crawlers/shopee/converted-shops/${shopDetailStore.id}/products?page=1&limit=10`,
      "GET",
      {},
      false
      )

    if (resultApi.result.status === 200) {
      shopDetailStore.getDate(resultApi.result.data.data);
      shopDetailStore.infoProducts = resultApi.result.data.data;
      // console.log("data : ", resultApi.result.data);
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="nav-option" style={{backgroundColor: "#fff"}}>
          <div className={shopDetailStore.showAbout ? "about active" : "about" } onClick={() => shopDetailStore.showAbout = true}>ABOUT</div>
          <div className={shopDetailStore.showAbout ? "product" : " product active" } onClick={this.showProducts}>PRODUCT</div>
          {shopDetailStore.showAbout && 
            <Button type="primary" className="approve-btn-detail">
              Approve Shop
            </Button>
          }
        </div>
        <div className="info-main shop-detail" >
        {shopDetailStore.showAbout ? 
          <About info={shopDetailStore.info} />
          :
          <Product infoProducts = {shopDetailStore.infoProducts}/>
        }

        </div>
      </React.Fragment>
    )
  }
}
