import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Pagination, Table } from 'antd';
import React, { Component } from 'react'
import { observer } from 'mobx-react';
import { shopDetailStore } from './../shopDetailStore';
import { callApi } from '../../../utils/callAPI';
import { notify } from '../../../common/notify/NotifyService';
import ModalProduct from "./ModalProduct";
import { observable } from 'mobx';
// interface ProductProps {
//   infoProducts: any
// }
@observer
export default class Product extends Component<any> {

  @observable private loading: boolean = false;
  componentDidMount() {
    this.requestAPI();
  }

  columns: any = [
    { title: "Image", dataIndex: "images", width: "100px",
      render: (src: any) => (
        <>
          <img src={src[0]?.image_url} alt="img" style={{width: "79%"}}/>
        </>
      )
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category" ,
      render: (category: any) => (
        <>
          {category?.id}
        </>
      )
    },
    { title: "Flash Sale", dataIndex: "flash", key: "flash",
      render: (flash: any) => (
        <>
          No
        </>
      )
    },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Update At", dataIndex: "updated_at", key: "updated_at" },
    { title: "Action", dataIndex:"product_id",
      render: (product_id: string) => {
        return (
        <> 
          <i className="fas fa-pencil-alt" style={{margin: "0 10px"}} onClick={() => this.showModalProduct(product_id)}></i>
        </> 
        )
      }
    },
  ];

  showModalProduct = (str: string) => {
    shopDetailStore.handleModal = true;
    shopDetailStore.product_id = str; 
  }
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
  onSelectChange = (selectedRowKeys: any) => {
    shopDetailStore.selectedRowKeys = selectedRowKeys;
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
  };
  onChange = (page: number) => {
    shopDetailStore.currentPage = page;
    this.requestAPI();
  }
  requestAPI = async () => {
    this.loading = true;
    const resultApi = await callApi(
      `v1/crawlers/shopee/converted-shops/${this.props.id}/products?page=${shopDetailStore.currentPage}&limit=${shopDetailStore.pageSizeProducts}`,
      "GET",
      {},
      false
    )
    if (resultApi.result.status === 200) {
      shopDetailStore.getDate(resultApi.result.data.data);
      shopDetailStore.infoProducts = resultApi.result.data.data;
      shopDetailStore.totalProducts = resultApi.result.data.pagination.total_elements;
      shopDetailStore.totalPage = Math.ceil(resultApi.result.data.pagination.total_elements / shopDetailStore.pageSizeProducts);
      // console.log("data img : ", resultApi.result.data.images);
    }
    this.loading = false;
  }
  handleApprove = async () => {
    const resultApi = await callApi(
      `v1/crawlers/shopee/approved-shops`,
      "POST",
      {"shop_ids": shopDetailStore.id},
      false
      );
    if (resultApi.result.status === 200) {
      shopDetailStore.selectedRowKeys = [];
      notify.show(" Approved " , "success")
      // console.log("data : ", resultApi.result.data.pagination.total_elements);
    }
  }
  supportFixDetail = () => {
    this.requestAPI();
  }
  render() {
    const rowSelection: any = {
      onChange: this.onSelectChange,
      selectedRowKeys: shopDetailStore.selectedRowKeys, 
    };
    return (
      <React.Fragment>
        <div className="nav-table" style={{border: "none"}}>
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
                FlashSale <DownOutlined />
              </Button>
            </Dropdown>
            <Dropdown overlay={this.menu}>
              <Button >
                Status <DownOutlined />
              </Button>
            </Dropdown>
            <Button type="primary" style={{backgroundColor: "#f54b24",border: "none"}}>
              Filter
            </Button> 
          </div>
          <div className="right-option">
            <Button type="primary" style={{border: "none",margin: "10px", backgroundColor: "#ffa009"}} onClick={() => this.props.history.push("/crawled-sellers")}>
              Back
            </Button>
            <Button type="primary" style={{border: "none",margin: "10px"}} onClick={this.handleApprove}>
              Approve
            </Button>
          </div>
        </div>
        {!this.loading ? 
          <React.Fragment>
            <p>Total : {shopDetailStore.totalProducts} products</p>
            {shopDetailStore.handleModal && <ModalProduct isModalVisible={shopDetailStore.handleModal} supportFixDetail={this.supportFixDetail} /> }
            <Table style={{border: "none !important"}} rowSelection={rowSelection} bordered dataSource={shopDetailStore.infoProducts} columns={this.columns} pagination={false}/>
            <Pagination current={shopDetailStore.currentPage} onChange={this.onChange} total={shopDetailStore.totalPage * 10} showSizeChanger={false} />
          </React.Fragment>
          :
          <React.Fragment>
            <div className="loading d-flex-content" style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "142px"}}>
              <img src="/assets/img/loading_data.gif" style={{width: "10%"}} alt="loading"/>
            </div>
          </React.Fragment>
        }
      </React.Fragment> 
    );
  }
}
