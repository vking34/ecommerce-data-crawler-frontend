/* eslint-disable eqeqeq */
import React, { Component } from "react";
import { Table, DatePicker, Pagination} from "antd";
import { observer } from "mobx-react";
import {DownOutlined} from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import moment from 'moment';

import myRawSellerParam from "./components/myRawSellerParam";
import { rawSellerStore } from "./rawSellerStore";
import { callApi } from "../../utils/callAPI";
import { Moment } from "../../common/Moment";
import { Link } from "react-router-dom";
import { menuStore } from "../menu/menuStore";
// import { Link } from "react-router-dom";
// import { DateRangePicker } from "rsuite";
import { notify } from './../../common/notify/NotifyService';

interface RawSellerProps {
  history: { push: (path: string) => any };
  location: { search: string };
}

const { RangePicker } = DatePicker;
@observer
export default class RawSeller extends Component<RawSellerProps, any> {
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
  handleFilterPhone = (str: any) => {
    rawSellerStore.phone = str;
    if(str === "ALL"){
      this.props.history.push(`/raw-seller?page=${rawSellerStore.currentPage}&limit=${rawSellerStore.pageSize}`)
    }else{
      this.props.history.push(`/raw-seller?page=${rawSellerStore.currentPage}&limit=${rawSellerStore.pageSize}&phone_numbers=${str}`)
    }
  }
  componentDidMount() {
    menuStore.changeOption("1Raw");
    this.requestAPI();
  }
  componentDidUpdate(prevProps: Readonly<RawSellerProps>,prevState: Readonly<any>,snapshot?: any) {
    if (prevProps.location.search !== this.props.location.search) {
      this.requestAPI();
    }
  }

  requestAPI = async () => {
    if(this.props.location.search){
      const params = new myRawSellerParam(this.props.location.search)
      rawSellerStore.phone = params.getPhone;
      rawSellerStore.currentPage = params.getPage;
      rawSellerStore.pageSize = params.getLimit;
      const resultApi = await callApi(
        `v1/crawlers/shopee/raw-shops?page=${rawSellerStore.currentPage}&limit=${rawSellerStore.pageSize}&phone_numbers=${rawSellerStore.phone}`,
        "GET",
        {},
        false
        );
      if (resultApi.result.status === 200) {
        rawSellerStore.getDate(resultApi.result.data.data);
        rawSellerStore.data = resultApi.result.data.data;
        rawSellerStore.totalPage = Math.ceil(resultApi.result.data.pagination.total_elements / rawSellerStore.pageSize);
        // console.log("data : ", resultApi.result.data.pagination.total_elements);
      }
    }else {
      this.props.history.push(`/raw-seller?page=${rawSellerStore.currentPage}&limit=${rawSellerStore.pageSize}&phone_numbers=${rawSellerStore.phone}`)  
    }
  };
  // handlPage = (e: any)=> {
  //   console.log("page : ", e);
  // } 
  columns: any = [
    { title: "Id", dataIndex: "_id", },
    { title: "Username", dataIndex: "account",
      render : (account: any) => (
        <>
          <p>{account.username}</p>
        </>
      )
    },
    { title: "Shop", dataIndex: "name",
      render: (name: string) => (
        <>
          {/* <Link to= "/shop-detail"> */}
            <p>{name}</p>
          {/* </Link> */}
        </>
      )
    },
    { title: "Phone Numbers",dataIndex: "phone_numbers",
      render: (phone_numbers: string[]) => (
        <>
          {phone_numbers.length < 1 ? <span  style={{marginLeft: "10px"}}> Chưa có số điện thoại </span> :
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
          }
        </>
      ),
    },
    { title: "Update At", dataIndex: "updated_at"},
    // { title: "Crawl Status", dataIndex: "status"},
  ]; 

  onChange = (page: number) => {
    // console.log("page : " , page);
    rawSellerStore.currentPage = page;
    this.props.history.push(`/raw-seller?page=${rawSellerStore.currentPage}&limit=${rawSellerStore.pageSize}&phone_numbers=${rawSellerStore.phone}`)
  }
  filterDate = (e: any) => {
    rawSellerStore.startDate = Moment.getDate(e[0]._d.getTime(), "yyyy-mm-dd"); // _d -> date 
    rawSellerStore.endDate = Moment.getDate(e[1]._d.getTime(), "yyyy-mm-dd"); // _d -> date 
  }


  handleCrawl = async () => {
    const resultApi = await callApi(
      `v1/crawlers/shopee/converted-shops`,
      "POST",
      {
        shop_ids : this.dataPost
      },
      false
    );
    if (resultApi.result.status === 200) {
      rawSellerStore.selectedRowKeys = []; 
      notify.show(`Converted shops ... ! `, "success");
    }
  }
  render() {
    const menuPhone: any = (
      <Menu>
        <Menu.Item key="1" icon={<i className="mdi mdi-crosshairs-gps"/>} onClick={() => this.handleFilterPhone("ALL")}>
          <span style={{color: rawSellerStore.phone == "ALL" ? "#f54b24" : ""}}>ALL</span>
        </Menu.Item>
        <Menu.Item key="2" icon={<i className="mdi mdi-crosshairs-gps"/>} onClick={() => this.handleFilterPhone(1)}>
          <span style={{color: rawSellerStore.phone == 1 ? "#f54b24" : ""}}>TRUE</span>
        </Menu.Item>
        <Menu.Item key="3" icon={<i className="mdi mdi-crosshairs-gps"/>} onClick={() => this.handleFilterPhone(0)}>
          <span style={{color: rawSellerStore.phone == 0 ? "#f54b24" : ""}}>FALSE</span>
        </Menu.Item>
      </Menu>
    );
    const rowSelection: any = {
      onChange: (selectedRowKeys:any, selectedRows:any) => {
        rawSellerStore.selectedRowKeys = selectedRowKeys;
        this.dataPost = selectedRowKeys;
      },
      selectedRowKeys: rawSellerStore.selectedRowKeys,
    }
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
            <RangePicker
              style={{height: "33px", margin: "10px"}}
              value={[moment(rawSellerStore.startDate, "YYYY/MM/DD"), moment(rawSellerStore.endDate, "YYYY/MM/DD")]}
              // value={[moment('2015/01/01', "YYYY/MM/DD"), moment('2015/01/01', "YYYY/MM/DD")]}
              format={"YYYY/MM/DD"}
              onChange={this.filterDate}
            />
            <Dropdown overlay={this.menu}>
              <Button>
                {rawSellerStore.market} <DownOutlined />
              </Button>
            </Dropdown>
            <Dropdown overlay={menuPhone}>
              <Button>
                Phone Number <DownOutlined />
              </Button>
            </Dropdown>
            <Dropdown overlay={this.menu}>
              <Button>
                {rawSellerStore.status} <DownOutlined />
              </Button>
            </Dropdown>

            <Button type="primary" style={{backgroundColor: "#f54b24",border: "none"}}>
              Filter
            </Button>
            <i className="fas fa-download" style={{fontSize: "30px", cursor: "pointer"}}></i>
          </div>
          <div className="right-option">
            <Button type="primary" style={{border: "none",margin: "10px",backgroundColor: "#42ed2f",}} onClick={this.handleCrawl}>
              Crawl
            </Button>
          </div>
        </div>
        {/* <Table rowSelection={{...this.rowSelection}} dataSource={this.data} columns={this.columns} bordered pagination={false} /> */}
        <Table rowSelection={rowSelection} dataSource={rawSellerStore.data} columns={this.columns} bordered pagination={false} />
        <Pagination current={rawSellerStore.currentPage} onChange={this.onChange} total={rawSellerStore.totalPage * 10} showSizeChanger={false}/>
      </React.Fragment>
    );
  }
}
