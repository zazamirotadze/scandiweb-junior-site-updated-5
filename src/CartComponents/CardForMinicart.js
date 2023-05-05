import React, { Component } from 'react'
import { givePriceTwoDigits } from '../reuseableFunctionsandVariables/reuseableFunctionsAndVariables'
import RenderOptions from '../reusableComponents/RenderOptions'
import RenderColor from '../reusableComponents/RenderColor'
import PlusMinusBtnsComp from '../reusableComponents/PlusMinusBtnsComp'

export default class CardForMinicart extends Component {
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
          upperCase={false}
          selectMethod={undefined}
        />
      }else{
          return <RenderOptions
          key={element.id}
          attribute = {element}
          upperCase={false}
          selectMethod={undefined}
        />
      }
  
      
    })
    return (
      <div className='minicart-card'>
        <div className='minicart-card__content'>
            <h3>{brand}</h3>
            <h3>{name}</h3>
            <h3>{this.props.selectedCurrencySymbol}{filteredPriceAmount}</h3>
            {renderAttributes}
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
