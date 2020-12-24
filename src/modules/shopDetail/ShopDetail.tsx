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
    // const resultApi = await callApi(
    //   `v1/crawlers/shopee/converted-shops/${shopDetailStore.id}/products?page=${shopDetailStore.currentPage}&limit=${shopDetailStore.pageSizeProducts}`,
    //   // `v1/crawlers/shopee/converted-shops/SHOPEE.107287927/products?page=${shopDetailStore.currentPage}&limit=${shopDetailStore.pageSizeProducts}`,
    //   "GET",
    //   {}, 
    //   false
    //   )

    // if (resultApi.result.status === 200) {
    //   shopDetailStore.getDate(resultApi.result.data.data);
    //   shopDetailStore.infoProducts = resultApi.result.data.data;
    //   shopDetailStore.totalPage = resultApi.result.data.pagination.total_elements / shopDetailStore.pageSizeProducts;
    //   // console.log("data : ", resultApi.result.data);
    // }
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
            <Button type="primary" className="approve-btn-detail" onClick={this.handleApprove}>
              Approve Shop
            </Button>
          }
        </div>
        <div className="info-main shop-detail" >
        {shopDetailStore.showAbout ? 
          <About info={shopDetailStore.info} />
          :
          <Product infoProducts = {shopDetailStore.infoProducts} id={shopDetailStore.id}/>
        }

        </div>
      </React.Fragment>
    )
  }
}
