import React, { Component } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import GET_CURRENCY from "./graphQlqueries/GET_CURRENCY"
import Price from './Price';
import OutsideCloser from './reusableComponents/OutsideCloser';
export default class Prices extends Component {
    state = {
        currencies: [],
        IsOptionsClosed: true
    }

    openOptions =  () => {
      this.setState({IsOptionsClosed: false})
    }
    closeOptions =  () => {
      this.setState({IsOptionsClosed: true})
    }

    componentDidMount() {
        this.fetchCategories();
    }
    
    fetchCategories = () => {
        this.props.client
          .query({
            query: GET_CURRENCY,
          })
          .then((result) => {
            const currencies = result.data.currencies.map(({ label, symbol }) => ({ label, symbol }))
            !this.props.selectedCurrencySymbol && this.props.selectCurrencySymbol(currencies[0].symbol)
            this.setState({currencies})
          })
          .catch((error) => {
            console.log(error);
          });
    };

  render() {
    const renderCurrencies = this.state.currencies.map(element => 
        <Price 
            key={element.symbol} 
            symbol={element.symbol}  
            label={element.label}
            selectCurrencySymbol = {this.props.selectCurrencySymbol}
            selectedCurrencySymbol = {this.props.selectedCurrencySymbol}
            closeOptions = {this.closeOptions} 
        />)
    return (
        <div className='nav__cart-price-div--price  '>
            <div onClick={()=>  this.openOptions()  }>
            {this.props.selectedCurrencySymbol} 
            </div>
            {this.state.IsOptionsClosed && <MdKeyboardArrowDown onClick={()=> this.openOptions()} /> }
            {!this.state.IsOptionsClosed && (
                <>
                  <MdKeyboardArrowUp onClick={this.closeOptions} />
                  <OutsideCloser functionMethod={this.closeOptions}>
                    <div className='options givebordershadow'>
                        {renderCurrencies}
                    </div>
                  </OutsideCloser>
                </>
            )}
        </div>
    )
  }
}
