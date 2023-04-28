import React, { Component } from 'react'
import RenderCheckbox from '../reusableComponents/RenderCheckbox';
import RenderOptions from '../reusableComponents/RenderOptions';
import RenderColor from '../reusableComponents/RenderColor';
import OutsideCloser from '../reusableComponents/OutsideCloser';
import { addToCartWord, getQueryParams, filterAttributes } from '../reuseableFunctionsandVariables/reuseableFunctionsAndVariables';

export default class Popup extends Component {

  render() {
    const {  attributes } = this.props.DetailedProductData
    const hasSelectedItems = attributes.every(attribute => {
      return attribute.items.some(item => item.isSelected);
    }); 
    const currentSearchParams =  new URLSearchParams(this.props.location.search);
    const entries = currentSearchParams.entries();
    const queryParams = getQueryParams(entries);  
    const filteredAttributes = filterAttributes(queryParams, attributes)
    return (
      <OutsideCloser functionMethod={this.props.closePopup}>
      <div className='popup givebordershadow'
          onClick={(e) => { 
            e.stopPropagation(); 
            e.preventDefault()
          }} 
       >
          <div>
            <RenderOptions
              attributes = {filteredAttributes}
              attribute = {this.props.allAttributesId[0]}
              upperCase={false}
              selectMethod={this.props.modifyDetailProduct}
            />
            <RenderOptions
              attributes = {filteredAttributes}
              attribute = {this.props.allAttributesId[2]}
              upperCase={false}
              selectMethod={this.props.modifyDetailProduct}
            />
            <RenderColor
              attributes = {filteredAttributes}
              attribute = {this.props.allAttributesId[1]}
              upperCase={false}
              selectMethod={this.props.modifyDetailProduct}
            />
            <RenderCheckbox
              attributes = {filteredAttributes}
              attribute = {this.props.allAttributesId[3]}
              upperCase={false}
              selectMethod={this.props.modifyDetailProduct}
            />
            <RenderCheckbox
              attributes = {filteredAttributes}
              attribute = {this.props.allAttributesId[4]}
              upperCase={false}
              selectMethod={this.props.modifyDetailProduct}
            />
          </div>
          <button onClick={()=>{
            this.props.addToCart()
            hasSelectedItems && this.props.closePopup() 
          }} >{addToCartWord}</button>      
      </div>
      </OutsideCloser>
    )
  }
}


