import React, { Component } from 'react'
import { Button, Input, Modal } from 'antd';
import { observer } from 'mobx-react';
import { shopDetailStore } from './../shopDetailStore';
import { observable } from 'mobx';

@observer
export default class ModalProduct extends Component<any> {
  
  @observable private editInfoProduct: boolean = false;
  showInfoDetail = (title: string, name: string, content: any) => {
    return(
      <div className="modal-info">
        <h3 style={{marginBottom: "0"}}>{title}</h3> 
        {this.editInfoProduct ? 
        <Input value={content} placeholder={title} name={name} />
        :
        <p>{content ? content : "null"}</p>
        }
      </div>
    )
  } 

  render() {
    return ( 
      <React.Fragment>
        <Modal visible={shopDetailStore.handleModal} width={1000} onCancel={() => shopDetailStore.handleModal = false}>
          { this.editInfoProduct ? 
            <React.Fragment>
              <Button className="btn-edit" type="primary" onClick={() => this.editInfoProduct = false}>
                Save     
              </Button> 
              <Button className="btn-edit" type="primary" style={{backgroundColor: "#f2b04d"}} onClick={() => this.editInfoProduct = false}>
                Cancel     
              </Button> 
            </React.Fragment>
          :
            <Button className="btn-edit" type="primary" style={{backgroundColor: "#f4b658"}} onClick={() => this.editInfoProduct = true}>
              Edit     
            </Button>
          }
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
                    {this.showInfoDetail("Tên sản phẩm ","name", item?.name)}
                    {this.showInfoDetail("Tình trạng  ", "condition",item?.condition)}
                    {this.showInfoDetail("Cận nặng  ","weight", item?.weight)}
                    {this.showInfoDetail("Kiểu ","type", item?.type)}
                    {this.showInfoDetail("Giá gốc", "price" ,item?.variants[0].price)}
                    {this.showInfoDetail("Giá sale ", "sale_price", item?.variants[0].sale_price)}
                    {this.showInfoDetail("Số lượng ",  "in_quantity",item?.variants[0].inventory.in_quantity)}
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
