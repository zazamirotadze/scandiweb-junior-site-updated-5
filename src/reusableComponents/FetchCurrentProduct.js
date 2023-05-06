import React, { Component } from 'react'
import GET_PRODUCT from "../graphQlqueries/GET_PRODUCT"

export default class FetchCurrentProduct extends Component {

    componentDidMount() {
        if(this.props.popupIsShown){
            this.fetchCategoryData();
        } 
    }
    
   
    
  fetchCategoryData = () => {
    const { location } = this.props;
    let productId = location.pathname.split('/')[1];
    if(productId === "details"){
      productId = location.pathname.split('/')[2];
    }
    
    this.props.client
      .query({
        query: GET_PRODUCT,
        variables: { id:  productId },
        fetchPolicy: 'no-cache'
      })
      .then(result =>{ 
       let modifiedData = result.data.product
        modifiedData.attributes.forEach((attribute) => {
          attribute.items.forEach((item) => {
            item.isSelected = false;
          });
        }); 
        this.props.selectDetailedProduct(modifiedData)
      });
  }
    
  render() {
    return (
      <>
        {Object.keys(this.props.DetailedProductData).length !== 0 && (
          this.props.children
        )}
      </>
    );
  }  
}

