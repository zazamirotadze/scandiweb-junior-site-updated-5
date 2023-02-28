import React, { Component } from 'react'
import { givePriceTwoDigits } from '../reuseableFunctionsandVariables/reuseableFunctionsAndVariables'
import RenderOptions from '../reusableComponents/RenderOptions'
import RenderColor from '../reusableComponents/RenderColor'
import RenderCheckbox from '../reusableComponents/RenderCheckbox'
import PhotosInCart from './PhotosInCart'
import PlusMinusBtnsComp from '../reusableComponents/PlusMinusBtnsComp'
export default class CardForCart extends Component {

  render() {
    const { brand, name, prices, attributes, gallery, quantity, IdInCart } = this.props.data
    //prices
    const renderPrice = prices.find(element => element.currency.symbol===this.props.selectedCurrencySymbol)
    const filteredPriceAmount =  givePriceTwoDigits(renderPrice.amount)
    //
    return (
      <div className='cart__card' >
        <div className='cart__card-attributes' >
          <h3>{brand}</h3>
          <h3>{name}</h3>
          <h4>{this.props.selectedCurrencySymbol}{filteredPriceAmount}</h4>
          <RenderOptions
            attributes = {attributes}
            attribute = {this.props.allAttributesId[0]}
            upperCase={true}
            selectMethod={undefined}
          />
          <RenderOptions
            attributes = {attributes}
            attribute = {this.props.allAttributesId[2]}
            upperCase={true}
            selectMethod={undefined}
          />
          <RenderColor
            attributes = {attributes}
            attribute = {this.props.allAttributesId[1]}
            upperCase={true}
            selectMethod={undefined}
          />
          <RenderCheckbox
            attributes = {attributes}
            attribute = {this.props.allAttributesId[3]}
            upperCase={true}
            selectMethod={undefined}
          />
          <RenderCheckbox
            attributes = {attributes}
            attribute = {this.props.allAttributesId[4]}
            upperCase={true}
            selectMethod={undefined}
          />
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
