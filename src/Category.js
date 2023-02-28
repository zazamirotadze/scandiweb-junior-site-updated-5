import React, { Component } from 'react';
import ProductList from './ProductList';
import GET_CATEGORY from './graphQlqueries/GET_CATEGORY';
import { fetchAllAttributesAndValues, selectedAttributesFetcher, filterByAttributeName, filterByAttributeValue } from './reuseableFunctionsandVariables/reuseableFunctionsAndVariables';


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
        let attributesWithIsSelected = attributes;
        attributesWithIsSelected.forEach(element => element.items.forEach( element => element.isSelected = false ))
        this.props.selectAttrubutes(attributesWithIsSelected, selectedCategoryName)
      });
  }

  render() {

    const selectedAttributes = selectedAttributesFetcher(this.props.attributes)
    const filteredByAttributeName = filterByAttributeName(selectedAttributes, this.props.products)
    const filteredByAttributeValue = filterByAttributeValue(selectedAttributes,filteredByAttributeName, this.props.products)

    return <>
            <ProductList
            client = {this.props.client} 
            key={this.props.selectedCategoryName}
            data={filteredByAttributeValue} 
            selectedCurrencySymbol={this.props.selectedCurrencySymbol}
            selectProductId={this.props.selectProductId}
            attributes={this.props.attributes}
            allAttributesId={this.props.allAttributesId}
            selectedProductId = {this.props.selectedProductId}
            DetailedProductData={this.props.DetailedProductData}
            selectDetailedProduct={this.props.selectDetailedProduct}
            modifyDetailProduct={this.props.modifyDetailProduct}
            addToCart={this.props.addToCart}
            />;
          </>
  }
}

export default Category;


