import React, { Component } from 'react';
import logo from "./images/logo-transparent.png"
import cartIcon from "./images/Vector.png"
import CategoryBtn from './CategoryBtn';
import categoriesQuery from './graphQlqueries/categoriesQuery';
import Prices from './Prices';
import { getTotalQuantity } from './reuseableFunctionsandVariables/reuseableFunctionsAndVariables';
import Minicart from './CartComponents/Minicart';

export default class Nav extends Component {
    state={
        categoriesNames: [],
        miniCartIsShown: false,
    }
    openMinicart = () => {
      this.setState({miniCartIsShown: true})
    }
    closeMinicart = () => {
      this.setState({miniCartIsShown: false})
    }


    componentDidMount() {
        this.fetchCategories();
    }

    
      fetchCategories = () => {
        this.props.client
          .query({
            query: categoriesQuery,
          })
          .then((result) => {
            const categories = result.data.categories
            // fetch categoryes
            const categoriesNames =  categories.map(element => element.name);
            this.setState({ categoriesNames });
            if(!JSON.parse(localStorage.getItem("selectedCategoryName"))){
              this.props.selectCategory(categoriesNames[0])
            }
            //
            // fetch attributes
            const attributeIds = new Set();
            categories.forEach(category => {
              category.products.forEach(product => {
                product.attributes.forEach(attribute => {
                  attributeIds.add(attribute.id);
                });
              });
            });
        //    const attributeIdsArray = Array.from(attributeIds);
        //    this.props.fetchAttributes(attributeIdsArray)
            //
     
          })
          .catch((error) => {
            console.log(error);
          });
      };
      
    render(){
        const renderCategoryBtns = this.state.categoriesNames.map(element => 
            <CategoryBtn 
              key={element} 
              name={element}
              selectCategory={this.props.selectCategory}
              selectedCategoryName={this.props.selectedCategoryName}
              attributes={this.props.attributes}
              history = {this.props.history}
            />
          )
        const totalQuantity = getTotalQuantity(this.props.cartData)
        return(
            <>
                <div className='nav'>
                    <div>
                        {renderCategoryBtns}
                    </div>
                    <img src={logo} alt="logo" />
                    <div className='nav__cart-price-div'>
                        <Prices 
                          client = {this.props.client}
                          selectedCurrencySymbol = {this.props.selectedCurrencySymbol}  
                          selectCurrencySymbol={this.props.selectCurrencySymbol}
                        />
                        <div className='nav__cart-price-div--cart' >
                            <img  
                              src={cartIcon} alt="cartIcon" 
                              onClick={()=>this.openMinicart()}
                            />
                          {totalQuantity>0 && <div><div>{totalQuantity}</div></div>}   
                        </div>
                    </div>
                    <div className='giveAbsolutePosition'>
                    {this.state.miniCartIsShown && 
                      <Minicart
                        cartData={this.props.cartData}
                        selectedCurrencySymbol = {this.props.selectedCurrencySymbol}
                        allAttributesId={this.props.allAttributesId}
                        increaseQuantity={this.props.increaseQuantity}
                        decreaseQuantity={this.props.decreaseQuantity}
                        buyProducts={this.props.buyProducts}
                        closeMinicart={this.closeMinicart}
                      />
                    }
                    </div>
                </div>
                {this.state.miniCartIsShown && <div className='minicart-overlay' ></div>}
            </>

        )
    }
}

