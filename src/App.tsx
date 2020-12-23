import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";
import 'antd/dist/antd.css';

import Header from "./modules/header/Header";
// import Footer from "./modules/footer/Footer";
import Menu from "./modules/menu/Menu";
import { commonStore } from "./common/commonStore";
import LoginPage from "./modules/authen/LoginPage";
import {ListRouter} from "./modules/listRouter/ListRouter";
import NotifyComponent from "./common/notify/NotifyComponent";
import { menuStore } from "./modules/menu/menuStore";

export default class App extends Component {

  private checkBody =React.createRef<HTMLDivElement>();

  componentDidMount() {
    document.addEventListener('click', this.handleClickMenu);
  }
  
  handleClickMenu = (e: any) => {
    const {target} = e;
    const node = this.checkBody.current;
    if (node) {
      if (node.contains(target)) {
        menuStore.showMenu = false;
        // console.log(" show : ", menuStore.showMenu);
      } 
    }
  }

  render() {
    window.scroll(0,0);
    return (
      <React.Fragment>
        {!commonStore.showFormLogin ? 
        <Router>
          <div>  
            <div className="container-scroller">
              <Header />
              <div className="container-fluid page-body-wrapper">
                <NotifyComponent/>  
                <Menu />
                <div className="main-panel" ref={this.checkBody}>
                  <div className="content-wrapper">
                    <ListRouter />
                  </div>
                  {/* <Footer /> */}
                </div>
              </div>
            </div>
           </div>
        </Router>
        : <LoginPage />
        }
      </React.Fragment>
      );
  }
}
