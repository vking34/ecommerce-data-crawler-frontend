import React, { Component } from 'react'
import { observer } from "mobx-react"

import {shopDetailStore} from "./shopDetailStore"
import { Button } from 'antd'
import About from "./components/About";
import Product from "./components/Product";
// import "./style.css";

@observer
export default class ShopDetail extends Component {

  render() {
    return (
      <React.Fragment>
        <div className="nav-option" style={{backgroundColor: "#fff"}}>
          <div className={shopDetailStore.showAbout ? "about active" : "about" } onClick={() => shopDetailStore.showAbout = true}>ABOUT</div>
          <div className={shopDetailStore.showAbout ? "product" : " product active" }onClick={() => shopDetailStore.showAbout = false}>PRODUCT</div>
          <Button type="primary" className="approve-btn-detail">
            Approve Shop
          </Button>
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
