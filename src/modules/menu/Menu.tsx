import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Menu extends Component {
  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-profile">
            <a href="/" className="nav-link">
              <div className="nav-profile-image">
                <img src="/logo.png" alt="profile" />
                <span className="login-status online" />
                {/*change to offline or busy as needed*/}
              </div>
              <div className="nav-profile-text d-flex flex-column">
                <span className="font-weight-bold mb-2">V_Dev</span>
                <span className="text-secondary text-small">
                  Project Manager
                </span>
              </div>
              <i className="mdi mdi-bookmark-check text-success nav-profile-badge" />
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/shop-detail">
              <span className="menu-title">Shop Detail</span>
              <i className="mdi mdi-home menu-icon" />
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#list-seller" 
                aria-expanded="true" aria-controls="list-seller">
              <span className="menu-title">Seller</span>
              <i className="menu-arrow" />
              <i className="mdi mdi-shopping menu-icon" />
            </a>
            <div className="collapse show" id="list-seller">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className="nav-link" to="/raw-seller">
                    Raw Seller
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/crawl-seller">
                    Crawl Seller
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/shop-state">
                    Shop State
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/crawling-addition">
                   Crawling Addition
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#list-setting" 
                aria-expanded="false" aria-controls="list-setting">
              <span className="menu-title">Setting</span>
              <i className="menu-arrow" />
              <i className="mdi mdi-settings menu-icon" />
              {/* <i className="mdi mdi-crosshairs-gps menu-icon" /> */}
            </a>
            <div className="collapse" id="list-setting">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Shops
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
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
