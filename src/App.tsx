import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";
import 'antd/dist/antd.css';

import Header from "./modules/header/Header";
// import Footer from "./modules/footer/Footer";
import Menu from "./modules/menu/Menu";
import { commonStore } from "./common/commonStore";
// import LoginPage from "./modules/authen/LoginPage";
import {ListRouter, RouterLogin} from "./modules/listRouter/ListRouter";
import NotifyComponent from "./common/notify/NotifyComponent";
import { menuStore } from "./modules/menu/menuStore";
import { observer } from "mobx-react";

import StorageService from "./utils/storageService";

@observer
export default class App extends Component {

  private checkBody =React.createRef<HTMLDivElement>();

  componentDidMount() {
    // console.log("token : " , StorageService.getToken());
    if(StorageService.getToken() === null){
      commonStore.showFormLogin = true;
    }else {
      commonStore.showFormLogin =false;
    }
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
                    {/* {commonStore.showFormLogin ? 
                      <RouterLogin />
                      : */}
                      <ListRouter /> 
                    {/* } */}
                  </div>
                  {/* <Footer /> */}
                </div>
              </div>
            </div>
           </div>
        </Router>
        :  
        <Router>
          <RouterLogin />
        </Router>
      }
      </React.Fragment>
      );
  }
}
