import React, { Component } from 'react';
import ProductList from './ProductList';
import GET_CATEGORY from './graphQlqueries/GET_CATEGORY';
import { fetchAllAttributesAndValues, getQueryParams, filterProducts } from './reuseableFunctionsandVariables/reuseableFunctionsAndVariables';


class Category extends Component {

  componentDidMount(){
    this.fetchCategoryData(this.props.selectedCategoryName);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedCategoryName !== prevProps.selectedCategoryName || this.props.products.length === 0   ){
      this.fetchCategoryData(this.props.selectedCategoryName);
    }
  }
 

  fetchCategoryData = (selectedCategoryName) => {
    this.props.client
      .query({
        query: GET_CATEGORY,
        variables: { input: { title: selectedCategoryName } },
        fetchPolicy: 'no-cache'
      })
      .then(result => { 
        this.props.selectProducts(result.data.category.products)
        const attributes = fetchAllAttributesAndValues(JSON.parse(JSON.stringify(result.data.category.products)) )
        this.props.selectAttrubutes(attributes, selectedCategoryName)
        
      });
  }

  render() {
   const currentSearchParams = new URLSearchParams(this.props.location.search)
   const entries = currentSearchParams.entries()
   const queryParams = getQueryParams(entries)
   let filteredProducts  = filterProducts(this.props.products,queryParams ) 



    return <>
            <ProductList
            client = {this.props.client} 
            key={this.props.selectedCategoryName}
            data={filteredProducts} 
            selectedCurrencySymbol={this.props.selectedCurrencySymbol}
            selectProductId={this.props.selectProductId}
            attributes={this.props.attributes}
            allAttributesId={this.props.allAttributesId}
            selectedProductId = {this.props.selectedProductId}
            DetailedProductData={this.props.DetailedProductData}
            selectDetailedProduct={this.props.selectDetailedProduct}
            modifyDetailProduct={this.props.modifyDetailProduct}
            addToCart={this.props.addToCart}
            location={this.props.location}
            />;
          </>
  }
}

export default Category;


