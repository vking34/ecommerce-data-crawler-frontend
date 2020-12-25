/* eslint-disable eqeqeq */
import React, { Component } from "react";
import { Pagination, Table } from "antd";
import { observer } from "mobx-react";
import {DownOutlined} from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";

import myCrawlSellerParam from "./components/myCrawlSellerParam";
import { crawlSellerStore } from "./crawlSellerStore";
import { callApi } from "../../utils/callAPI";
import { Link } from "react-router-dom";
import { menuStore } from "../menu/menuStore";
import { notify } from './../../common/notify/NotifyService';

interface CrawlSellerProps {
  history: { push: (path: string) => any };
  location: { search: string };
}
@observer
export default class CrawlSeller extends Component<CrawlSellerProps, any> {
  private dataPost: string[] = [];
  menu: any = (
    <Menu>
      <Menu.Item key="1" icon={<i className="mdi mdi-crosshairs-gps"/>}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<i className="mdi mdi-crosshairs-gps"/>}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<i className="mdi mdi-crosshairs-gps"/>}>
        3rd menu item
      </Menu.Item>
    </Menu>
  );
  menuState: any = (
    <Menu>
      <Menu.Item key="1" icon={<i className="mdi mdi-crosshairs-gps"/>} onClick={() => this.handleFilterState("STATE")}>
        All
      </Menu.Item>
      <Menu.Item key="1" icon={<i className="mdi mdi-crosshairs-gps"/>} onClick={() => this.handleFilterState("INIT")}>
        INIT
      </Menu.Item>
      <Menu.Item key="2" icon={<i className="mdi mdi-crosshairs-gps"/>} onClick={() => this.handleFilterState("PROCESSING")}>
        PROCESSING
      </Menu.Item>
      <Menu.Item key="3" icon={<i className="mdi mdi-crosshairs-gps"/>} onClick={() => this.handleFilterState("DONE")}>
        DONE
      </Menu.Item>
    </Menu>
  );
  handleFilterPhone = (str: any) => {
    crawlSellerStore.phone = str;
    if(str === "ALL"){
      this.props.history.push(`/crawled-sellers?page=${crawlSellerStore.currentPage}&limit=${crawlSellerStore.pageSize}`)
    }else{
      this.props.history.push(`/crawled-sellers?page=${crawlSellerStore.currentPage}&limit=${crawlSellerStore.pageSize}&phone_numbers=${str}`)
    }
  }
  handleFilterState = (str: string) => {
    crawlSellerStore.state = str;
    if(str === "STATE"){
      this.props.history.push(`/crawled-sellers?page=${crawlSellerStore.currentPage}&limit=${crawlSellerStore.pageSize}&phone_numbers=${crawlSellerStore.phone}`)
    }else{
      this.props.history.push(`/crawled-sellers?state=${crawlSellerStore.state}&page=${crawlSellerStore.currentPage}&limit=${crawlSellerStore.pageSize}&phone_numbers=${crawlSellerStore.phone}`)
    }
  }
  componentDidMount() {
    menuStore.changeOption("1Crawl");
    this.requestAPI();
  }
  componentDidUpdate(prevProps: Readonly<CrawlSellerProps>,prevState: Readonly<any>,snapshot?: any) {
    if (prevProps.location.search !== this.props.location.search) {
      this.requestAPI();
    }
  }

  requestAPI = async () => {
    let url: string = "/"; 
    if(this.props.location.search){
      const params = new myCrawlSellerParam(this.props.location.search)
      crawlSellerStore.phone = params.getPhone;
      crawlSellerStore.state = params.getState;
      crawlSellerStore.currentPage = params.getPage;
      crawlSellerStore.pageSize = params.getLimit;
      url = crawlSellerStore.state === "STATE" ? 
        `v1/crawlers/shopee/converted-shops?page=${crawlSellerStore.currentPage}&limit=${crawlSellerStore.pageSize}&phone_numbers=${crawlSellerStore.phone}`
        :
        `v1/crawlers/shopee/converted-shops?state=${crawlSellerStore.state}&page=${crawlSellerStore.currentPage}&limit=${crawlSellerStore.pageSize}&phone_numbers=${crawlSellerStore.phone}`
      const resultApi = await callApi(
        url,
        "GET",
        {},
        false
      );
      if (resultApi.result.status === 200) {
        crawlSellerStore.getDate(resultApi.result.data.data);
        crawlSellerStore.data = resultApi.result.data.data;
        crawlSellerStore.totalShops = resultApi.result.data.pagination.total_elements;
        crawlSellerStore.totalPage = Math.ceil(resultApi.result.data.pagination.total_elements / crawlSellerStore.pageSize);
        // console.log("data : ", resultApi.result.data.data);
      }
    }else {
      this.props.history.push(`/crawled-sellers?page=${crawlSellerStore.currentPage}&limit=${crawlSellerStore.pageSize}&phone_numbers=${crawlSellerStore.phone}`)
    }
  };

  columns: any = [
    { title: "Id", dataIndex: "_id" },
    { title: "Username", dataIndex: "username"},
    { title: "Shop", dataIndex: "name"},
    { title: "Phone Numbers",dataIndex: "phone_numbers",
      render: (phone_numbers: string[]) => (
        <>
          {phone_numbers.length > 0 ?
            <React.Fragment>
              <div className="dropdown show-dropdown option-main open">
                <span data-toggle="dropdown" aria-expanded="true">
                  <i className="fas fa-phone" style={{margin: "7px 17px", color: "#f54b24"}}></i>
                  <span>
                    {phone_numbers[0]} &nbsp;
                    <i className="fas fa-angle-down" />
                  </span>
                </span>
                <ul className="dropdown-menu">
                {phone_numbers.map((phone_number: string, index: number) => {
                  return (
                      <li key={index}>
                        <i className="fas fa-phone" style={{margin: "7px 17px", color: "#f54b24"}}></i>
                        <span>{phone_number}</span>
                      </li>
                  );
                })}
                </ul>
              </div>
            </React.Fragment>
            :
            <span style={{opacity: "0.7", margin: "0 15px"}}>null</span>
          }
        </>
      ),
    },
    // { title: "Products Quantity", dataIndex: "quantity"},
    { title: "State", dataIndex: "state" },
    { title: "Update At", dataIndex: "updated_at" },
    { title: "Action", dataIndex:"_id",
      render: (_id: string) => (
        <>
            <i className="fas fa-pencil-alt" style={{margin: "0 10px"}} onClick={() => this.showDetail(_id)}></i>
        </>
      )
    },
  ];
  showDetail = (str: string) => {
    this.props.history.push(`/shop-detail?id=${str}`);
  }
  onChange = (page: number) => {
    crawlSellerStore.currentPage = page;
    this.props.history.push(`/crawled-sellers?page=${crawlSellerStore.currentPage}&limit=${crawlSellerStore.pageSize}&phone_numbers=${crawlSellerStore.phone}`)
  }

  handleApprove = async () => {
    const resultApi = await callApi(
      `v1/crawlers/shopee/approved-shops`,
      "POST",
      {"shop_ids": this.dataPost},
      false
      );
    if (resultApi.result.status === 200) {
      crawlSellerStore.selectedRowKeys = [];
      notify.show(" Approved ", "success")
      // console.log("data : ", resultApi.result.data.pagination.total_elements);
    }
  }
  render() {
    const menuPhone: any = (
      <Menu>
        <Menu.Item key="1" icon={<i className="mdi mdi-crosshairs-gps"/>} onClick={() => this.handleFilterPhone("ALL")}>
          <span style={{color: crawlSellerStore.phone == "ALL" ? "#f54b24" : ""}}>ALL</span>
        </Menu.Item>
        <Menu.Item key="2" icon={<i className="mdi mdi-crosshairs-gps"/>} onClick={() => this.handleFilterPhone(1)}>
          <span style={{color: crawlSellerStore.phone == 1 ? "#f54b24" : ""}}>TRUE</span>
        </Menu.Item>
        <Menu.Item key="3" icon={<i className="mdi mdi-crosshairs-gps"/>} onClick={() => this.handleFilterPhone(0)}>
          <span style={{color: crawlSellerStore.phone == 0 ? "#f54b24" : ""}}>FALSE</span>
        </Menu.Item> 
      </Menu>
    );
    const rowSelection: any = {
      onChange: (selectedRowKeys:any, selectedRows:any) => {
        crawlSellerStore.selectedRowKeys = selectedRowKeys;
        this.dataPost = selectedRowKeys;
      },
      selectedRowKeys: crawlSellerStore.selectedRowKeys, 
    };
    return (
      <React.Fragment>
        <div className="nav-table">
          <div className="left-option">
            <div className="search-field d-none d-md-block" style={{height: "33px", margin: "10px"}}>
              <form className="d-flex align-items-center h-100" action="#">
                <div className="input-group">
                  <div className="input-group-prepend bg-transparent">
                    <i className="input-group-text border-0 mdi mdi-magnify" style={{ backgroundColor: "#F2EDF3" }}/>
                  </div>
                  <input type="text" className="form-control bg-transparent border-0" placeholder="Search ..."/>
                </div>
              </form>
            </div>
            <Dropdown overlay={this.menu}>
              <Button >
                {crawlSellerStore.market} <DownOutlined />
              </Button>
            </Dropdown>
            <Dropdown overlay={menuPhone}>
              <Button >
                Phone Number <DownOutlined />
              </Button>
            </Dropdown>
            <Dropdown overlay={this.menuState}>
              <Button >
                {crawlSellerStore.state} <DownOutlined />
              </Button>
            </Dropdown>
            <Button type="primary" style={{backgroundColor: "#f54b24",border: "none"}}>
              Filter
            </Button>
          </div>
          <div className="right-option">
            <Link to="/crawling-addition">
              <Button type="primary" style={{ margin: "10px", width: "99px" }}>
                Add
              </Button>
            </Link>
            <Button type="primary" style={{border: "none",margin: "10px",backgroundColor: "#42ed2f",}} onClick={this.handleApprove}>
              Approve
            </Button>
            <i className="fas fa-download" style={{fontSize: "30px", margin: "10px"}}></i>
          </div>
        </div>
        <p style={{margin: "10px"}}>Total : {crawlSellerStore.totalShops} shops</p>
        {/* <Table rowSelection={{...this.rowSelection}} dataSource={this.data} columns={this.columns} bordered pagination={false}/> */}
        <Table rowSelection={rowSelection}  dataSource={crawlSellerStore.data} columns={this.columns} bordered pagination={false}/>
        <Pagination current={crawlSellerStore.currentPage} onChange={this.onChange} total={crawlSellerStore.totalPage * 10} showSizeChanger={false} />
      </React.Fragment>
    );
  }
}
