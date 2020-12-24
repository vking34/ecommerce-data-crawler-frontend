import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { menuStore } from "./menuStore";
import { rawSellerStore } from './../rawSeller/rawSellerStore';
import { crawlSellerStore } from "../crawlSeller/crawlSellerStore";

@observer
export default class Menu extends Component {
  private menuRef =React.createRef<HTMLDivElement>();
  urlRawSeller = `/raw-seller?page=${rawSellerStore.currentPage}&limit=${rawSellerStore.pageSize}`;
  urlCrawlSeller = crawlSellerStore.state === "STATE" ? 
   `/crawl-seller?page=${crawlSellerStore.currentPage}&limit=${crawlSellerStore.pageSize}`
   :
   `/crawl-seller?state=${crawlSellerStore.state}&page=${crawlSellerStore.currentPage}&limit=${crawlSellerStore.pageSize}`
  
  render() {
    return (
      <nav className={!menuStore.showMenu ? "sidebar sidebar-offcanvas menu-main" : " menu-main sidebar sidebar-offcanvas active"} ref={this.menuRef} style={{backgroundColor: "#181824"}}>
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link" to="/shop-detail">
              <span className="menu-title">Shop Detail</span>
              <i className="mdi mdi-home menu-icon" />
            </Link>
          </li>
          <li className="nav-item"> 
            <a className="nav-link" data-toggle="collapse" href="#list-seller" 
                aria-expanded="true" aria-controls="list-seller">
              <span className="menu-title" style={{color: menuStore.option.charAt(0) === "1" ? "#f54b24" : ""}} >
                Seller
              </span>
              <i className="menu-arrow" />
              <i className="mdi mdi-shopping menu-icon" />
            </a>
            <div className="collapse show" id="list-seller">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className="nav-link" to={this.urlRawSeller} style={{color: menuStore.option === "1Raw" ? "#f54b24" : ""}} onClick={() => menuStore.changeOption("1Raw")} >
                    Raw Seller
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={this.urlCrawlSeller} style={{color: menuStore.option === "1Crawl" ? "#f54b24" : ""}} onClick={() => menuStore.changeOption("1Crawl")}>
                    Crawl Seller
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/crawling-addition" style={{color: menuStore.option === "1Crawling" ? "#f54b24" : ""}} onClick={() => menuStore.changeOption("1Crawling")}>
                   Crawling Addition
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#list-setting" 
                aria-expanded="false" aria-controls="list-setting">
              <span className="menu-title"  style={{color: menuStore.option.charAt(0) === "2" ? "#f54b24" : ""}}>
                Setting
              </span>
              <i className="menu-arrow" />
              <i className="mdi mdi-settings menu-icon" />
              {/* <i className="mdi mdi-crosshairs-gps menu-icon" /> */}
            </a>
            <div className="collapse" id="list-setting">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className="nav-link" to="/" style={{color: menuStore.option === "2Shop" ? "#f54b24" : ""}} onClick={() => menuStore.changeOption("2Shop")}>
                    Shops
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" style={{color: menuStore.option === "2Categories" ? "#f54b24" : ""}} onClick={() => menuStore.changeOption("2Categories")}>
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" style={{color: menuStore.option === "2Products" ? "#f54b24" : ""}} onClick={() => menuStore.changeOption("2Products")}>
                    Products
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          {/* <li className="nav-item sidebar-actions">
            <span className="nav-link">
              <div className="border-bottom">
                <h6 className="font-weight-normal mb-3">Projects</h6>
              </div>
              <button className="btn btn-block btn-lg btn-gradient-primary mt-4">
                + Add a project
              </button>
              <div className="mt-4">
                <div className="border-bottom">
                  <p className="text-secondary">Test</p>
                </div>
                <ul className="gradient-bullet-list mt-4">
                  <li>Free</li>
                  <li>Pro</li>
                </ul>
              </div>
            </span>
          </li>
         */}
        </ul>
      </nav>
    );
  }
}
