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

interface CrawlSellerProps {
  history: { push: (path: string) => any };
  location: { search: string };
}
@observer
export default class CrawlSeller extends Component<CrawlSellerProps, any> {
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
  handleFilterState = (str: string) => {
    crawlSellerStore.state = str;
    if(str === "STATE"){
      this.props.history.push(`/crawl-seller?page=${crawlSellerStore.currentPage}&limit=${crawlSellerStore.pageSize}`)
    }else{
      this.props.history.push(`/crawl-seller?state=${crawlSellerStore.state}&page=${crawlSellerStore.currentPage}&limit=${crawlSellerStore.pageSize}`)
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
      crawlSellerStore.state = params.getState;
      crawlSellerStore.currentPage = params.getPage;
      crawlSellerStore.pageSize = params.getLimit;
      url = crawlSellerStore.state === "STATE" ? 
        `v1/crawlers/shopee/converted-shops?page=${crawlSellerStore.currentPage}&limit=${crawlSellerStore.pageSize}`
        :
        `v1/crawlers/shopee/converted-shops?state=${crawlSellerStore.state}&page=${crawlSellerStore.currentPage}&limit=${crawlSellerStore.pageSize}`
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
        crawlSellerStore.totalPage = resultApi.result.data.pagination.total_elements / crawlSellerStore.pageSize;
        // console.log("data : ", resultApi.result.data.data);
      }
    }else {
      this.props.history.push(`/crawl-seller?page=${crawlSellerStore.currentPage}&limit=${crawlSellerStore.pageSize}`)
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
            <span style={{opacity: "0.7"}}>null</span>
          }
        </>
      ),
    },
    { title: "Products Quantity", dataIndex: "quantity"},
    { title: "State", dataIndex: "state" },
    // { title: "Chozoi Status", dataIndex: "state"},
    { title: "Update At", dataIndex: "updated_at" },
    { title: "Action", dataIndex:"action",
      render: (id: any) => (
        // <i className="fas fa-pencil-alt"></i>
        <>
          <Link to="/shop-detail">
            <i className="fas fa-pencil-alt" style={{margin: "0 10px"}}></i>
          </Link>
        </>
      )
    },
  ];
  // data = [
  //   {
  //     key: "1",
  //     _id: '1',
  //     name: 'Mike',
  //     phone_numbers: ["0985299551"],
  //     quantity: 32,
  //     state: "DONE",
  //     updated_at: "23/12/2020",
  //   },
  //   {
  //     key: "2",
  //     _id: '2',
  //     name: 'Mike',
  //     phone_numbers: [],
  //     quantity: 32,
  //     state: "DONE",
  //     updated_at: "23/12/2020",
  //     action: ["1"]
  //   },
  //   {
  //     key: "3",
  //     _id: '3',
  //     name: 'Mike',
  //     phone_numbers: [],
  //     quantity: 32,
  //     state: "DONE",
  //     updated_at: "23/12/2020",
  //     action: ["1"]
  //   },
  // ];
  onChange = (page: number) => {
    crawlSellerStore.currentPage = page;
    this.props.history.push(`/crawl-seller?page=${crawlSellerStore.currentPage}&limit=${crawlSellerStore.pageSize}`)
  }
  rowSelection: any = {
    onChange: (selectedRowKeys:any, selectedRows:any) => {
      crawlSellerStore.selectedRowKeys = selectedRowKeys;
    }
  };
  handleApprove = async () => {
    // const resultApi = await callApi(
    //   `v1/crawlers/shopee/shops/raw?page=${rawSellerStore.currentPage}&limit=${rawSellerStore.pageSize}`,
    //   "POST",
    //   {},
    //   false
    //   );
    // if (resultApi.result.status === 200) {
    //   rawSellerStore.getDate(resultApi.result.data.data);
    //   rawSellerStore.data = resultApi.result.data.data;
    //   rawSellerStore.totalPage = resultApi.result.data.pagination.total_elements / rawSellerStore.pageSize;
    //   // console.log("data : ", resultApi.result.data.pagination.total_elements);
    // }
  }
  render() {
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
        <Table rowSelection={{...this.rowSelection}}  dataSource={crawlSellerStore.data} columns={this.columns} bordered pagination={false}/>
        <Pagination current={crawlSellerStore.currentPage} onChange={this.onChange} total={crawlSellerStore.totalPage * 10} showSizeChanger={false} />
      </React.Fragment>
    );
  }
}
