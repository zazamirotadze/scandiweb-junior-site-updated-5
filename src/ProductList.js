import React, { Component } from 'react'
import Product from './Product'

export default class ProductList extends Component {
  
  render() {
    
    const renderProducts = this.props.data.map(element =>
      <Product 
        key={element.id}
        {...element}
        selectedCurrencySymbol={this.props.selectedCurrencySymbol}
        selectProductId={this.props.selectProductId}
        selectedProductId = {this.props.selectedProductId}
        client = {this.props.client} 
        allAttributes={this.props.attributes}

        allAttributesId={this.props.allAttributesId}
        DetailedProductData={this.props.DetailedProductData}
        selectDetailedProduct={this.props.selectDetailedProduct}
        modifyDetailProduct={this.props.modifyDetailProduct}
        addToCart={this.props.addToCart}
      />
    )
    return (
      <div className='products-list' >
        {renderProducts}
      </div>
    )
  }
}
