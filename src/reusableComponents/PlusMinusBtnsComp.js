import React, { Component } from 'react'
import { TfiPlus, TfiMinus } from 'react-icons/tfi';
export default class PlusMinusBtnsComp extends Component {
  render() {
    return (
      <div className='pls-minus-bt-div'>
        <button 
          className={`${this.props.isBigBtn?'pls-minus-bt-Big':"pls-minus-bt-Sm"}`}
          onClick={()=>this.props.increaseQuantity(this.props.IdInCart)}
        >
          <TfiPlus/>
        </button>
        <div className={`${this.props.isBigBtn?"bigQuantity":"smQuantity"}`} >{this.props.quantity}</div>
        <button 
          className={`${this.props.isBigBtn?'pls-minus-bt-Big':"pls-minus-bt-Sm"}`}
          onClick={()=>this.props.decreaseQuantity(this.props.IdInCart)}
        >
          <TfiMinus/>
        </button>
      </div>
    )
  }
}
