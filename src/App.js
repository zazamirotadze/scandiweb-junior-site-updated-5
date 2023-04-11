import React, { Component } from 'react';
import Category from './Category';
import Nav from './Nav';
import {Switch, Route} from "react-router-dom"
import Cart from './CartComponents/Cart';
import FetchCurrentProduct from './reusableComponents/FetchCurrentProduct';
import DetailedProduct from "./DescriptionComponetns/DetailedProduct"
import FiltersComponet from './FiltersComponent/FiltersComponet';
import { selectedAttributesFetcher, attributesValueArrayCreator} from './reuseableFunctionsandVariables/reuseableFunctionsAndVariables';
import { withRouter } from 'react-router-dom';


class App extends Component {
  state={
    products: [],
    selectedCategoryName: JSON.parse(localStorage.getItem("selectedCategoryName"))? JSON.parse(localStorage.getItem("selectedCategoryName")): "", 
    selectedCurrencySymbol: JSON.parse(localStorage.getItem("selectedCurrencySymbol"))? JSON.parse(localStorage.getItem("selectedCurrencySymbol")):"",
    selectedProductId: JSON.parse(localStorage.getItem("selectedProductId"))? JSON.parse(localStorage.getItem("selectedProductId")):"",
    allAttributesId: [],
    DetailedProductData: {},
    cartData:JSON.parse(localStorage.getItem("cartData"))? JSON.parse(localStorage.getItem("cartData")):[],
    attributes:JSON.parse(localStorage.getItem("attributes"))? JSON.parse(localStorage.getItem("attributes")):[],

  }
  handleFilterChange = (modifiedAttributesData) => {
      const selectedAttributes = selectedAttributesFetcher(modifiedAttributesData)
      const filteredattributesValues = attributesValueArrayCreator(selectedAttributes)
      let filteredattributesValuesUrl = filteredattributesValues.join('');
      this.props.history.push(`/${filteredattributesValuesUrl}`);
  }
  

  selectProducts = (productData) => {
    this.setState({products: productData})
  }
  selectCategory = (selectedCategoryName) => {
    this.setState({selectedCategoryName});
     // to avoid sudden old product when refetch current product
    this.setState({DetailedProductData: {}})

    // to activate category data fetching if it is a different category
    if(JSON.parse(localStorage.getItem("selectedCategoryName")) !== selectedCategoryName){
      this.setState({attributes: [] })
      localStorage.setItem("attributes", JSON.stringify([]))
    }
    //
  }
  selectCurrencySymbol = (selectedCurrencySymbol) => {
    this.setState({selectedCurrencySymbol})
    localStorage.setItem("selectedCurrencySymbol", JSON.stringify(selectedCurrencySymbol))
  }
  selectProductId = (id) => {
    this.setState({selectedProductId : id})
    localStorage.setItem("selectedProductId", JSON.stringify(id))
  }
  fetchAttributes = (allAttributesId) => {
    this.setState({allAttributesId})
  }
  selectDetailedProduct = (data) => {
    this.setState({DetailedProductData: data})
  }
  // for filter component
  selectAttrubutes = (data, selectedCategoryName) => {
      if(JSON.parse(localStorage.getItem("selectedCategoryName")) !== selectedCategoryName){
      this.setState({attributes: data})
      localStorage.setItem("attributes", JSON.stringify(data))
     
      // I am  adding here  categoryName into the local storage because I want to indicate when category changes
      localStorage.setItem("selectedCategoryName", JSON.stringify(selectedCategoryName))
      //
    }
  }
  modifyFiltersData = (valueId, attributeName) => {
    let modifiedAttributesData = JSON.parse(JSON.stringify(this.state.attributes));
    let findAttribute = modifiedAttributesData.find(element => element.name === attributeName);
   
    findAttribute.items.forEach(element => {
      if (element.id === valueId) {
        element.isSelected = !element.isSelected;
      }
    })
    this.setState({attributes:  modifiedAttributesData})
    localStorage.setItem("attributes", JSON.stringify( modifiedAttributesData))
    this.handleFilterChange(modifiedAttributesData)
    
  }
  //
  modifyDetailProduct = (valueId, attributeName) => {
    let modifiedDetailProdData = JSON.parse(JSON.stringify(this.state.DetailedProductData));
    let findAttribute = modifiedDetailProdData.attributes.find(element => element.name === attributeName);
    findAttribute.items.forEach(element => {
      element.isSelected = (element.id === valueId);
    });
    this.setState({ DetailedProductData: modifiedDetailProdData });
  }




  addToCart = () => {
    // check if we have selected attributes
    const hasSelectedItems = this.state.DetailedProductData.attributes.every(attribute => {
      return attribute.items.some(item => item.isSelected);
    });
    // error message when all of the attributes are not picked
    if(!hasSelectedItems){
      alert("Please choose all of the attributes")
    }
    //
    if(hasSelectedItems){
      // give cart Item unique Id 
      let DetailedProductDataWithId = this.state.DetailedProductData
      let selectedAttributes = DetailedProductDataWithId.attributes.map(element => 
        element.items.filter(element => element.isSelected === true)
      )
      const selectedIds = selectedAttributes
      .flat()
      .map(attribute => attribute.id)
      .join('');
      const IdInCart  = DetailedProductDataWithId.id + selectedIds
      DetailedProductDataWithId.IdInCart = IdInCart    
      // 
      // give cart Item quantity prop
      DetailedProductDataWithId.quantity = 1 
      //
      // case when There is no element In cart
      if(this.state.cartData.length === 0){
        this.setState((prevData) => {
          return {
            cartData: [...prevData.cartData, DetailedProductDataWithId]
          }
        },() => localStorage.setItem("cartData", JSON.stringify(this.state.cartData)) );
      } else  {
        const sameSelections =  this.state.cartData.find(element => element.IdInCart === DetailedProductDataWithId.IdInCart)
        // case when thre is a same attribute but with a different selections
        if(  !sameSelections ) {
          this.setState((prevData) => {
            return {
              cartData: [...prevData.cartData, DetailedProductDataWithId]
            }
          },() => localStorage.setItem("cartData", JSON.stringify(this.state.cartData))); 
        } // case when there is a same attributes but  with the same selections
        else {
          this.increaseQuantity(DetailedProductDataWithId.IdInCart )
        }
      }
    }
  }



  increaseQuantity = (IdInCart) => {
    this.setState(prevState => {
      const cartData0 = [...prevState.cartData];
      const index = cartData0.findIndex(element => element.IdInCart === IdInCart);
      cartData0[index] = {
        ...cartData0[index],
        quantity: cartData0[index].quantity + 1
      };
      return { cartData: cartData0 };
    },() => localStorage.setItem("cartData", JSON.stringify(this.state.cartData)));
  };
  decreaseQuantity = (IdInCart) => {
    let cartData0 = this.state.cartData
    let findObj = cartData0.find(element => element.IdInCart ===  IdInCart   )
    findObj.quantity = findObj.quantity - 1
    this.setState({cartData: cartData0},() => localStorage.setItem("cartData", JSON.stringify(this.state.cartData)));
    if(findObj.quantity === 0) {
      let filteredData = cartData0.filter(element => element.IdInCart !==  IdInCart   )
      this.setState({cartData: filteredData}, () => localStorage.setItem("cartData", JSON.stringify(this.state.cartData)))
    }
   }

  buyProducts = () => {
    this.setState({cartData: []}, () => localStorage.setItem("cartData", JSON.stringify(this.state.cartData)))
  }


  render() {
  
    return (
      <>
        <Nav 
            client = {this.props.client} 
            selectedCategoryName={this.state.selectedCategoryName}
            selectedCurrencySymbol={this.state.selectedCurrencySymbol}
            allAttributesId={this.state.allAttributesId}
            attributes={this.state.attributes}
            history = {this.props.history}

            selectCategory={this.selectCategory}
            selectCurrencySymbol = {this.selectCurrencySymbol}
            fetchAttributes  = {this.fetchAttributes}
            cartData={this.state.cartData}
            increaseQuantity={this.increaseQuantity}
            decreaseQuantity={this.decreaseQuantity}
            buyProducts={this.buyProducts}
          /> 
        <Switch>
        <Route path={`/details/:filterParams?`}
              render={() => (
                <FetchCurrentProduct
                  client={this.props.client}
                  popupIsShown={true}
                  selectedProductId={this.state.selectedProductId}
                  selectDetailedProduct={this.selectDetailedProduct}
                  DetailedProductData={this.state.DetailedProductData}
                >
                  <DetailedProduct
                    DetailedProductData={this.state.DetailedProductData}  
                    allAttributesId={this.state.allAttributesId}
                    selectedCurrencySymbol={this.state.selectedCurrencySymbol}
                    modifyDetailProduct={this.modifyDetailProduct}
                    addToCart={this.addToCart}
                    attributes={this.state.attributes}
                  />
                </FetchCurrentProduct>
              )} 
          />
           <Route path='/cart'
            render={() => (
              <Cart
                cartData={this.state.cartData}
                allAttributesId={this.state.allAttributesId}
                selectedCurrencySymbol={this.state.selectedCurrencySymbol}
                increaseQuantity={this.increaseQuantity}
                decreaseQuantity={this.decreaseQuantity}
                buyProducts={this.buyProducts}
                
              />
            )}
          />
          <Route  path = {`/:filterParams?`}
              render={() => (
                <>
                <div className='category-word' >{this.state.selectedCategoryName}</div>
                <FiltersComponet
                  attributes={this.state.attributes}
                  allAttributesId={this.state.allAttributesId}
                  modifyFiltersData={this.modifyFiltersData}
                />
                <Category
                  client = {this.props.client}
                  selectedCategoryName={this.state.selectedCategoryName}
                  selectedCurrencySymbol={this.state.selectedCurrencySymbol}
                  selectedProductId = {this.state.selectedProductId}
                  attributes={this.state.attributes}
                  products={this.state.products}
                  
                  selectProductId={this.selectProductId}
                  selectProducts={this.selectProducts}
                  allAttributesId={this.state.allAttributesId}
                  selectDetailedProduct={this.selectDetailedProduct}
                  DetailedProductData={this.state.DetailedProductData}
                  modifyDetailProduct={this.modifyDetailProduct}
                  addToCart={this.addToCart}
                  selectAttrubutes={this.selectAttrubutes}
                /></>
              )}
             
          />
          
         
        </Switch>
        
      </>
    );
  }
}

export default withRouter(App);






