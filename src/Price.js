import React, { Component } from 'react'

export default class Price extends Component {
  render() {
    return (
      <div className={`${this.props.selectedCurrencySymbol === this.props.symbol ? 'options__option makegrayBackground' :  'options__option'} `} 
        onClick={()=>{
            this.props.selectCurrencySymbol(this.props.symbol)
            setTimeout(() => {
                this.props.closeOptions()
            }, 100);
        }}
      >
            <span>{this.props.symbol}</span> 
            <span>{this.props.label}</span>    
      </div>
    )
  }
}
