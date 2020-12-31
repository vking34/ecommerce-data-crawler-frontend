import React, { Component } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { menuStore } from "./menuStore";
import { rawSellerStore } from './../rawSeller/rawSellerStore';
import { crawlSellerStore } from "../crawlSeller/crawlSellerStore";
import { commonStore } from './../../common/commonStore';

@observer
export default class Menu extends Component {
  private menuRef =React.createRef<HTMLDivElement>();
  urlRawSeller = `/raw-seller?page=${rawSellerStore.currentPage}&limit=${rawSellerStore.pageSize}&phone_numbers=${rawSellerStore.phone}`;
  urlCrawlSeller = crawlSellerStore.state === "STATE" ? 
   `/crawled-sellers?page=${crawlSellerStore.currentPage}&limit=${crawlSellerStore.pageSize}&phone_numbers=${crawlSellerStore.phone}`
   :
   `/crawled-sellers?state=${crawlSellerStore.state}&page=${crawlSellerStore.currentPage}&limit=${crawlSellerStore.pageSize}&phone_numbers=${crawlSellerStore.phone}`
  
  render() {
    return (
      <nav className={!menuStore.showMenu ? "sidebar sidebar-offcanvas menu-main" : " menu-main sidebar sidebar-offcanvas active"} ref={this.menuRef} style={{backgroundColor: "#181824"}}>
        <ul className="nav">
          {/* <li className="nav-item">
            <Link className="nav-link" to="/shop-detail">
              <span className="menu-title">Shop Detail</span>
              <i className="mdi mdi-home menu-icon" />
            </Link>
          </li> */}
          {commonStore.showFormLogin ? 
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <span className="menu-title">Login</span>
                <i className="fas fa-user menu-icon"></i>
              </Link>
            </li> 
            :
            <React.Fragment>
              <li className="nav-item"> 
                <a className="nav-link" data-toggle="collapse" href="#list-seller" 
                    aria-expanded="true" aria-controls="list-seller">
                  <span className="menu-title" style={{color: menuStore.option.charAt(0) === "1" ? "#f54b24" : ""}} >
                    Seller
                  </span>
                  <i className="menu-arrow" />
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-building-store" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke={menuStore.option.charAt(0) === "1" ? "#f54b24" : "#ffffff"} fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="3" y1="21" x2="21" y2="21" />
                    <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" />
                    <line x1="5" y1="21" x2="5" y2="10.85" />
                    <line x1="19" y1="21" x2="19" y2="10.85" />
                    <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
                  </svg>
                  {/* <img src="/assets/icon/booth.png" alt="booth"/> */}
                  {/* <i className="mdi mdi-shopping menu-icon" /> */}
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
                        Crawled Seller
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
            </React.Fragment>
          }
          {/* <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#list-setting" 
                aria-expanded="false" aria-controls="list-setting">
              <span className="menu-title"  style={{color: menuStore.option.charAt(0) === "2" ? "#f54b24" : ""}}>
                Setting
              </span>
              <i className="menu-arrow" />
              <i className="mdi mdi-settings menu-icon" />
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
           */}
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
