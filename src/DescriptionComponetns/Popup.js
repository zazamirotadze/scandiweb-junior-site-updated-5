import React, { Component } from 'react'
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
    const renderAttributes =filteredAttributes.map(element=> {
      if(element.type === "swatch"){
        return <RenderColor
        key={element.id}
          attribute = {element}
          upperCase={false}
          selectMethod={this.props.modifyDetailProduct}
        />
      }else{
          return <RenderOptions
          key={element.id}
          attribute = {element}
          upperCase={false}
          selectMethod={this.props.modifyDetailProduct}
        />
      }
  
      
    })
    return (
      <OutsideCloser functionMethod={this.props.closePopup}>
      <div className='popup givebordershadow'
          onClick={(e) => { 
            e.stopPropagation(); 
            e.preventDefault()
          }} 
       >
          <div>
            {renderAttributes}
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


