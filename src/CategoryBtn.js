import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { attributesValueArrayCreator, selectedAttributesFetcher } from './reuseableFunctionsandVariables/reuseableFunctionsAndVariables';
export default class CategoryBtn extends Component {

    render(){
        const selectedAttributes = selectedAttributesFetcher(this.props.attributes)
        const filteredattributesValues = attributesValueArrayCreator(selectedAttributes)
        let filteredattributesValuesUrl = filteredattributesValues.join('');
        return(
            <Link to={ JSON.parse(localStorage.getItem("selectedCategoryName")) === this.props.name ? `/${filteredattributesValuesUrl}`:`/`} >
                <button 
                    className= {this.props.selectedCategoryName === this.props.name ? 'categorybtn  activatedBtn' : "categorybtn"}
                    onClick={()=>{this.props.selectCategory(this.props.name)}} 
                >
                    {this.props.name.toUpperCase()}
                </button>
            </Link>
        )
    }
}

