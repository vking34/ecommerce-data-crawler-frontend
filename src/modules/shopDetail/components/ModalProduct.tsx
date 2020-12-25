import React, { Component } from 'react'
import { Button, Modal } from 'antd';
import { observer } from 'mobx-react';
import { shopDetailStore } from './../shopDetailStore';

@observer
export default class ModalProduct extends Component<any> {
  
  showInfoDetail = (title: string, content: any) => {
    return(
      <div className="modal-info">
        <h3 style={{marginBottom: "0"}}>{title}</h3> 
        <p>{content}</p>
      </div>
    )
  } 

  render() {
    return ( 
      <React.Fragment>
        <Modal visible={shopDetailStore.handleModal} width={1000} onCancel={() => shopDetailStore.handleModal = false}>
          <Button className="btn-edit" type="primary" style={{backgroundColor: "#f4b658"}}>
            Edit 
          </Button>
          {shopDetailStore.infoProducts.map((item: any, index: number) => {
            if(item.product_id === shopDetailStore.product_id){
              return (
                <div className="img-content-product">
                  <div className="imgs">
                    {item?.images.map((item: any, index: number) => (
                      <img src={item.image_url} alt="img" key={index} />
                    ))}
                  </div>
                  <div className="content-detail-product">
                    {this.showInfoDetail("Tên sản phẩm ", item?.name)}
                    {this.showInfoDetail("Tình trạng  ", item?.condition)}
                    {this.showInfoDetail("Cận nặng  ", item?.weight)}
                    {this.showInfoDetail("Kiểu ", item?.type)}
                    {this.showInfoDetail("Giá gốc", item?.variants[0].price)}
                    {this.showInfoDetail("Giá sale ", item?.variants[0].sale_price)}
                    {this.showInfoDetail("Số lượng ", item?.variants[0].inventory.in_quantity)}
                  </div>
                </div>
              )
            }else {
                return null
            }
          })}
        </Modal>
      </React.Fragment>
    )
  }
}
