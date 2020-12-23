import React, { Component } from "react";
import { Pagination, Table } from "antd";
import { observer } from "mobx-react";
import {DownOutlined,UserOutlined} from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";

// import myShopStateParam from "./components/myShopStateParam";
import { crawlSellerStore } from "./crawlSellerStore";
import { callApi } from "../../utils/callAPI";
import { Link } from "react-router-dom";

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

  componentDidMount() {
    this.requestAPI();
  }
  componentDidUpdate(prevProps: Readonly<CrawlSellerProps>,prevState: Readonly<any>,snapshot?: any) {
    if (prevProps.location.search !== this.props.location.search) {
      this.requestAPI();
    }
  }

  requestAPI = async () => {
    // if(this.props.location.search){
    //   const params = new myCrawlerSellerParam(this.props.location.search)
    //   crawlSellerStore.state = params.getState;
    const resultApi = await callApi(
      `v1/crawlers/shopee/shops`,
      "GET",
      {},
      false
    );
    if (resultApi.result.status === 200) {
      crawlSellerStore.getDate(resultApi.result.data.data);
      crawlSellerStore.data = resultApi.result.data.data;
      crawlSellerStore.totalPage = resultApi.result.data.pagination.total_elements / crawlSellerStore.pageSize;
      // console.log("data : ", resultApi.result.data.data);
    }
  };

  columns: any = [
    { title: "Id", dataIndex: "_id", key: "_id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Phone Numbers",dataIndex: "phone_numbers", key: "phone_numbers",
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
    { title: "Products Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "State", dataIndex: "state", key: "state" },
    { title: "Chozoi Status", dataIndex: "state", key: "state" },
    { title: "Update At", dataIndex: "updated_at", key: "updated_at" },
    { title: "Action", dataIndex:"action", key: "action",
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
  data = [
    {
      _id: '1',
      name: 'Mike',
      phone_numbers: ["0985299551"],
      quantity: 32,
      state: "DONE",
      updated_at: "23/12/2020",
    },
    {
      _id: '2',
      name: 'Mike',
      phone_numbers: [],
      quantity: 32,
      state: "DONE",
      updated_at: "23/12/2020",
      action: ["1"]
    },
  ];

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
            <Dropdown overlay={this.menu}>
              <Button >
                {crawlSellerStore.status} <DownOutlined />
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
            <Button type="primary" style={{border: "none",margin: "10px",backgroundColor: "#42ed2f",}}>
              Approve
            </Button>
            <i className="fas fa-download" style={{fontSize: "30px", margin: "10px"}}></i>
          </div>
        </div>
        <p style={{margin: "10px"}}>Total : 12399 shops</p>
        <Table dataSource={this.data} columns={this.columns} bordered pagination={false}/>
        {/* <Table dataSource={crawlSellerStore.data} columns={this.columns} bordered pagination={false}/> */}
        <Pagination current={crawlSellerStore.currentPage} onChange={(page: number) => crawlSellerStore.currentPage = page} total={crawlSellerStore.totalPage * 10} />
      </React.Fragment>
    );
  }
}
