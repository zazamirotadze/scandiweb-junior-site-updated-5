import React, { Component } from 'react'
import { givePriceTwoDigits } from '../reuseableFunctionsandVariables/reuseableFunctionsAndVariables'
import RenderOptions from '../reusableComponents/RenderOptions'
import RenderColor from '../reusableComponents/RenderColor'
import RenderCheckbox from '../reusableComponents/RenderCheckbox'
import PlusMinusBtnsComp from '../reusableComponents/PlusMinusBtnsComp'

export default class CardForMinicart extends Component {
  render() {
    const { brand, name, prices, attributes, gallery, quantity, IdInCart } = this.props.data
    //prices
    const renderPrice = prices.find(element => element.currency.symbol===this.props.selectedCurrencySymbol)
    const filteredPriceAmount =  givePriceTwoDigits(renderPrice.amount)
    //
    return (
      <div className='minicart-card'>
        <div className='minicart-card__content'>
            <h3>{brand}</h3>
            <h3>{name}</h3>
            <h3>{this.props.selectedCurrencySymbol}{filteredPriceAmount}</h3>
            <RenderOptions
            attributes = {attributes}
            attribute = {this.props.allAttributesId[0]}
            upperCase={false}
            selectMethod={undefined}
            />
            <RenderOptions
                attributes = {attributes}
                attribute = {this.props.allAttributesId[2]}
                upperCase={false}
                selectMethod={undefined}
            />
            <RenderColor
                attributes = {attributes}
                attribute = {this.props.allAttributesId[1]}
                upperCase={false}
                selectMethod={undefined}
            />
            <RenderCheckbox
                attributes = {attributes}
                attribute = {this.props.allAttributesId[3]}
                upperCase={false}
                selectMethod={undefined}
            />
            <RenderCheckbox
                attributes = {attributes}
                attribute = {this.props.allAttributesId[4]}
                upperCase={false}
                selectMethod={undefined}
            />
        </div>
        <div className='minicart-card__photo-btns-div'>
            <PlusMinusBtnsComp
                isBigBtn={false}
                quantity={quantity}
                IdInCart={IdInCart}
                increaseQuantity={this.props.increaseQuantity}
                decreaseQuantity={this.props.decreaseQuantity}
            />
            <img src={gallery[0]} alt="productImg" ></img>
        </div>
      </div>
    )
  }
}
