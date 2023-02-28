import React, { Component } from 'react'
import CardForCart from './CardForCart'
import { cartWord, getTotalSum, getTax21, givePriceTwoDigits, getTotalQuantity, tax21Word, quantityWord, TotalWord, colon, orderWord } from '../reuseableFunctionsandVariables/reuseableFunctionsAndVariables'

export default class Cart extends Component {
  render() {
    const renderCard = this.props.cartData.map((element)=> <CardForCart 
        key={element.IdInCart}
        data={element}
        selectedCurrencySymbol={this.props.selectedCurrencySymbol}
        allAttributesId={this.props.allAttributesId}
        increaseQuantity={this.props.increaseQuantity}
        decreaseQuantity={this.props.decreaseQuantity}
    />)
    const totalQuantity = getTotalQuantity(this.props.cartData)
    const totalSum = getTotalSum(this.props.cartData, this.props.selectedCurrencySymbol)
    const totalSumTwodig = givePriceTwoDigits(totalSum)
    const tax21 = getTax21(totalSum)
    const taxt21TwoDig=givePriceTwoDigits(tax21)
    return (
      <>
        
        <div className='cart'>
          <div>{cartWord}</div>
          {renderCard}
          <div className='cart__numbers-div' >
            <div>
              <div>{TotalWord}{colon}</div>
              <div>{quantityWord}{colon}</div>
              <div>{tax21Word}{colon}</div>
            </div>
            <div>
              <div>{this.props.selectedCurrencySymbol}{totalSumTwodig}</div>
              <div>{totalQuantity}</div>
              <div>{this.props.selectedCurrencySymbol}{taxt21TwoDig}</div>
            </div>
          </div>    
          <button onClick={()=>this.props.buyProducts()} >{orderWord}</button>
        </div>  
      </>
    )
  }
}
