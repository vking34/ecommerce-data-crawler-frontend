/* eslint-disable eqeqeq */
import React, { Component } from 'react'
import { Button, Input, Modal } from 'antd';
import { observer } from 'mobx-react';
import { shopDetailStore } from './../shopDetailStore';
import { observable } from 'mobx';
import { callApi } from '../../../utils/callAPI';
import { notify } from './../../../common/notify/NotifyService';

@observer
export default class ModalProduct extends Component<any> {
  private arrImg: any = [];
  @observable private editInfoProduct: boolean = false;
  currentProduct: any = {};
  showInfoDetail = (title: string, name: string, content: any) => {
    return(
      <div className="modal-info">
        <h3 style={{marginBottom: "0"}}>{title}</h3> 
        {this.editInfoProduct && name !== "price" && name !== "sale_price" && name !== "in_quantity" ? 
        <Input defaultValue={content} placeholder={title} name={name} onChange={this.handleInput} />
        : 
        <p>{content ? content : "null"}</p>
        }
      </div>
    )
  } 

  handleInput = (event: any) => {
    const { name , value} = event.target; 
    this.currentProduct = {
      ...this.currentProduct,
      [name]: value
    }
  }
  saveChangeInfo = async () => {
    // console.log("name : ", this.currentProduct.name);
    const resultApi = await callApi(
      `v1/crawlers/shopee/converted-shops/${shopDetailStore.id}/products/SHOPEE.${shopDetailStore.product_id}`,
      "PUT",
      {
        "packing_size": this.currentProduct.packing_size,
        "images": this.arrImg,
        // "images": this.currentProduct.images,
        "description": this.currentProduct.description,
        "type": this.currentProduct.type,
        "condition": this.currentProduct.condition,
        "is_quantity_limited": this.currentProduct.is_quantity_limited,
        "weight": this.currentProduct.weight,
        "auto_public": this.currentProduct.auto_public,
        "variants": this.currentProduct.variants,
        "free_ship_status": this.currentProduct.free_ship_status,
        "shipping_partner_code": this.currentProduct.shipping_partner_code,
        "name": this.currentProduct.name,
        "category": this.currentProduct.category,
        "platform": this.currentProduct.platform,
      },
      false
      )
    if (resultApi.result.status === 200) {
      const resultApiFixProduct = await callApi(
        `v1/crawlers/shopee/converted-shops/${this.props.id}/products?page=${shopDetailStore.currentPage}&limit=${shopDetailStore.pageSizeProducts}`,
        "GET",
        {},
        false
      )
      if (resultApiFixProduct.result.status === 200) {
        shopDetailStore.getDate(resultApiFixProduct.result.data.data);
        shopDetailStore.infoProducts = resultApiFixProduct.result.data.data;
        shopDetailStore.totalProducts = resultApiFixProduct.result.data.pagination.total_elements;
        shopDetailStore.totalPage = Math.ceil(resultApiFixProduct.result.data.pagination.total_elements / shopDetailStore.pageSizeProducts);
        // console.log("data : ", resultApi.result.data);
      }
      this.editInfoProduct = false;
      notify.show("Sửa thành công !", "success");
      this.props.supportFixDetail();
      shopDetailStore.handleModal = false;
    }
  }
  cancelEditDetail = async () => {
    this.editInfoProduct = false;
    this.arrImg = [];
  // shopDetailStore.handleModal = false;
  }
  handleImg = (index: number) => {
    let previewImages: any = document.getElementsByClassName('img-preview');
    // console.log("img : ", previewImages[index].src);
    if(previewImages[index].style.opacity == 0.3){
      this.arrImg.splice(index, 0 ,{
        "image_url" : previewImages[index].src, 
        "sort": index
      });
      previewImages[index].style.opacity = 1;
    } else {
      previewImages[index].style.opacity = 0.3;
      this.arrImg.splice(index, 1 );
    }
    // console.log("data img : ", this.arrImg); 
    
  }
  render() {
    return ( 
      <React.Fragment>
        <Modal visible={shopDetailStore.handleModal} width={1000} onCancel={() => shopDetailStore.handleModal = false} onOk={() => shopDetailStore.handleModal = false}>
          { this.editInfoProduct ? 
            <React.Fragment>
              <Button className="btn-edit" type="primary" onClick={this.saveChangeInfo}>
                Save     
              </Button> 
              <Button className="btn-edit" type="primary" style={{backgroundColor: "#f2b04d"}} onClick={this.cancelEditDetail}>
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
              this.currentProduct = item;
              return (
                <React.Fragment> 
                  {this.editInfoProduct && <h3 style={{fontWeight: 600}}>Chọn hình ảnh</h3>}
                  <div className="img-content-product">
                    <div className="imgs">
                      {item?.images.map((item: any, index: number) => (
                        this.editInfoProduct ? 
                        <img src={item.image_url} alt="img" key={index} className="img-preview" style={{opacity: "0.3",}} onClick={(e) => this.handleImg(index)} />
                        : 
                        <img src={item.image_url} alt="img" key={index} style={{}}  className="img-preview"/>
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
                </React.Fragment>
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
