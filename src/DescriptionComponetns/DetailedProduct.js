import React, { Component } from 'react'
import RenderOptions from '../reusableComponents/RenderOptions'
import RenderColor from '../reusableComponents/RenderColor'
import RenderCheckbox from '../reusableComponents/RenderCheckbox'
import PhotosInDetails from './PhotosInDetails'
import { addToCartWord, givePriceTwoDigits, selectedAttributesFetcher, filterAByB, filterByAttributeValueAndName } from '../reuseableFunctionsandVariables/reuseableFunctionsAndVariables'
export default class DetailedProduct extends Component {
  render() {
    const { gallery, brand, name, attributes, prices, description, inStock  } = this.props.DetailedProductData
    //prices
    const renderPrice = prices.find(element => element.currency.symbol===this.props.selectedCurrencySymbol)
    const filteredPriceAmount =  givePriceTwoDigits(renderPrice.amount)
    //
    // filter attributes
    const selectedAttributes = selectedAttributesFetcher(this.props.attributes)
    let attributes1 = JSON.parse(JSON.stringify(attributes)); 
    let attributes2 = JSON.parse(JSON.stringify(attributes))
    attributes2 = filterByAttributeValueAndName(attributes2, selectedAttributes)
    const attributes3 =  filterAByB(attributes1,  attributes2)

    return (
      <div className='detailed-product' > 
        <PhotosInDetails
          gallery={gallery}
          inStock={inStock}
        />
        <div className='detailed-product__attributes'>
          <div>
            <h3>{brand}</h3> 
            <h3>{name}</h3>
          </div>
          <div>
            <RenderOptions
              attributes = {attributes3}
              attribute = {this.props.allAttributesId[0]}
              upperCase={true}
              selectMethod={this.props.modifyDetailProduct}
            />
            <RenderOptions
              attributes = {attributes3}
              attribute = {this.props.allAttributesId[2]}
              upperCase={true}
              selectMethod={this.props.modifyDetailProduct}
            />
            <RenderColor
              attributes = {attributes3}
              attribute = {this.props.allAttributesId[1]}
              upperCase={true}
              selectMethod={this.props.modifyDetailProduct}
            />
            <RenderCheckbox
              attributes = {attributes3}
              attribute = {this.props.allAttributesId[3]}
              upperCase={true}
              selectMethod={this.props.modifyDetailProduct}
            />
            <RenderCheckbox
              attributes = {attributes3}
              attribute = {this.props.allAttributesId[4]}
              upperCase={true}
              selectMethod={this.props.modifyDetailProduct}
            />
            <div className='detailed-product__attributes--price-div'>
              <h4>{prices[0].__typename.toUpperCase()}:</h4>
              <h3>{this.props.selectedCurrencySymbol}{filteredPriceAmount}</h3>
            </div>
            {inStock && <button onClick={()=>this.props.addToCart()}>{addToCartWord}</button>}
            <div className='detailed-product__attributes--description' dangerouslySetInnerHTML={{__html: description}} />
          </div>
        </div>
      </div>
    )
  }
}

