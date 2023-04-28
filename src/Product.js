import React, { Component } from 'react'
import { givePriceTwoDigits, outOfStockWord } from './reuseableFunctionsandVariables/reuseableFunctionsAndVariables';
import quickShopIcon from "./images/Common.png"
import { Link } from 'react-router-dom';
import Popup from './DescriptionComponetns/Popup';
import FetchCurrentProduct from './reusableComponents/FetchCurrentProduct';
export default class Product extends Component {
  state={
    popupIsShown: false
  }
  openPopup = () => {
    this.setState({popupIsShown: true})
  }
  closePopup = () => {
    this.setState({popupIsShown: false})
  }
  
  render() {
    const {gallery, brand, name, prices, selectedCurrencySymbol, inStock, id, selectProductId, location  } = this.props
    const filteredPrices = prices.filter(price => price.currency.symbol === selectedCurrencySymbol);
    const filteredPriceAmount =  givePriceTwoDigits(filteredPrices[0].amount)
    
    const currentSearchParams =  new URLSearchParams(location.search);
    
    const filterParams = currentSearchParams.toString(); 
    return (
      <Link to={`/details/${filterParams}`} className="removeDefaultLinkStyle" >
        <div className='Item-Overlay-div' onClick={()=> selectProductId(id)}   > 
          {! inStock && <>
            <div className='overlay-div'></div>
            <div className='outOfstockWordDiv'>{outOfStockWord}</div>
          </>}
          {inStock && 
            <img  src={quickShopIcon}  alt="quickShopIcon"
              onClick={(e) => { 
                e.stopPropagation(); 
                e.preventDefault();
                this.openPopup()
                selectProductId(id)
              }} 
            />}
            <div className='product' >
              <div className='product__img-container'>
                <img src={gallery[0]} alt="productImage" />
              </div>
              <div>{brand} {name}</div>
              <div>{filteredPrices[0].currency.symbol}{filteredPriceAmount}</div>
            </div>
            {this.state.popupIsShown && 
              <FetchCurrentProduct
                client={this.props.client}
                popupIsShown={this.state.popupIsShown}
                selectedProductId={this.props.selectedProductId}
                selectDetailedProduct={this.props.selectDetailedProduct}
                DetailedProductData={this.props.DetailedProductData}
              >
                <Popup
                  DetailedProductData={this.props.DetailedProductData}  
                  allAttributesId={this.props.allAttributesId}
                  selectedCurrencySymbol={this.props.selectedCurrencySymbol}
                  allAttributes={this.props.allAttributes}
                  modifyDetailProduct={this.props.modifyDetailProduct}
                  addToCart={this.props.addToCart}
                  closePopup={this.closePopup}
                  location = {this.props.location}
                />
              </FetchCurrentProduct>
            }
        </div>
      </Link>
    )
  }
}




