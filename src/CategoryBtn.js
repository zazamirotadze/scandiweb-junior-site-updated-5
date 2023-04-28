import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class CategoryBtn extends Component {

    render(){
        return(
            <Link to="/" >
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

