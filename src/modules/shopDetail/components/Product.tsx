import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Pagination, Table } from 'antd';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

interface ProductProps {
  info: any
}
@observer
export default class Product extends Component<any> {

  columns: any = [
    { title: "Image", dataIndex: "img", key: "img", width: "100px",
      render: (src: string) => (
        <>
          <img src={src} alt="img" style={{width: "79%"}}/>
        </>
      )
    },
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
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Flash Sale", dataIndex: "flash", key: "flash" },
    { title: "Status", dataIndex: "status", key: "status" },
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
      img: '/assets/img/images.jpg',
      name: 'Mike',
      phone_numbers: [],
      category: 32,
      flash: "DONE",
      updated_at: "23/12/2020",
      status: "Approve"
    },
    {
      img: '/assets/img/images.jpg',
      name: 'Mike',
      phone_numbers: [],
      category: 32,
      flash: "DONE",
      updated_at: "23/12/2020",
      status: "Approve"
    },
  ];
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
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    // this.setState({ selectedRowKeys });
  };
  rowSelection: any = {
    // selectedRowKeys,
    onChange: this.onSelectChange,
  };

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
            <Button type="primary" style={{border: "none",margin: "10px",backgroundColor: "#42ed2f",}}>
              Approve
            </Button>
          </div>
        </div>
        <Table rowSelection={this.rowSelection}  dataSource={this.data} columns={this.columns} bordered pagination={false}/>
        {/* <Table dataSource={crawlSellerStore.data} columns={this.columns} bordered pagination={false}/> */}
        <Pagination current={1} onChange={(page: number) => console.log(page)} total={2 * 10} />
      </React.Fragment>
    );
  }
}
