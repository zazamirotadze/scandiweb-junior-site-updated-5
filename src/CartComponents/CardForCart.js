import React, { Component } from 'react'
import { givePriceTwoDigits } from '../reuseableFunctionsandVariables/reuseableFunctionsAndVariables'
import RenderOptions from '../reusableComponents/RenderOptions'
import RenderColor from '../reusableComponents/RenderColor'
import PhotosInCart from './PhotosInCart'
import PlusMinusBtnsComp from '../reusableComponents/PlusMinusBtnsComp'
export default class CardForCart extends Component {

  render() {
    const { brand, name, prices, attributes, gallery, quantity, IdInCart } = this.props.data
    //prices
    const renderPrice = prices.find(element => element.currency.symbol===this.props.selectedCurrencySymbol)
    const filteredPriceAmount =  givePriceTwoDigits(renderPrice.amount)
    //
    const renderAttributes =attributes.map(element=> {
      if(element.type === "swatch"){
        return <RenderColor
        key={element.id}
          attribute = {element}
          upperCase={true}
          selectMethod={undefined}
        />
      }else{
          return <RenderOptions
          key={element.id}
          attribute = {element}
          upperCase={true}
          selectMethod={undefined}
        />
      }})
    return (
      <div className='cart__card' >
        <div className='cart__card-attributes' >
          <h3>{brand}</h3>
          <h3>{name}</h3>
          <h4>{this.props.selectedCurrencySymbol}{filteredPriceAmount}</h4>
          {renderAttributes}
        </div>
        <div className='cart__card-btnsphotos' >
          <PlusMinusBtnsComp
            isBigBtn={true}
            quantity={quantity}
            IdInCart={IdInCart}
            increaseQuantity={this.props.increaseQuantity}
            decreaseQuantity={this.props.decreaseQuantity}
          />
          <PhotosInCart gallery={gallery}/>
        </div>
      </div>
    )
  }
}
