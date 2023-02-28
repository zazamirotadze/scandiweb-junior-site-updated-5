import React, { Component } from 'react'
import { myBagWord, itemsWord, getTotalQuantity,  TotalWord, getTotalSum, givePriceTwoDigits, viewBagWord, checkoutWord } from '../reuseableFunctionsandVariables/reuseableFunctionsAndVariables'
import CardForMinicart from './CardForMinicart'
import OutsideCloser from '../reusableComponents/OutsideCloser'
import { Link } from 'react-router-dom'
export default class Minicart extends Component {
  render() {
    const renderCard = this.props.cartData.map((element)=> <CardForMinicart
    key={element.IdInCart}
    data={element}
    selectedCurrencySymbol = {this.props.selectedCurrencySymbol}
    allAttributesId={this.props.allAttributesId}
    increaseQuantity={this.props.increaseQuantity}
    decreaseQuantity={this.props.decreaseQuantity}
    buyProducts={this.props.buyProducts}
    />)
    const totalQuantity = getTotalQuantity(this.props.cartData)
    const totalSum = getTotalSum(this.props.cartData, this.props.selectedCurrencySymbol)
    const totalSumTwodig = givePriceTwoDigits(totalSum)
    
    return ( <OutsideCloser functionMethod={this.props.closeMinicart}>
                <div className='minicart'> 
                    <div className='minicart__content'>

                        <div>
                            <h3>{myBagWord}</h3>
                            <h3> {totalQuantity} {itemsWord}</h3>
                        </div>

                        <div className='minicart__content--cards'>{renderCard}</div>

                        <div>
                            <h3>{TotalWord}</h3>
                            <h3>{this.props.selectedCurrencySymbol}{totalSumTwodig}</h3>
                        </div>
                    </div>
                    <div className='minicart__btns'>
                       <Link to="/cart" className='removeDefaultLinkStyle'>
                        <button 
                        className='viewBag-btn'
                        onClick={()=>this.props.closeMinicart()}
                        >{viewBagWord}  
                        </button>
                        </Link> 
                        <button onClick={()=>this.props.buyProducts()}>{checkoutWord}</button>
                    </div>           
                </div>
                </OutsideCloser> 
    )
  }
}
