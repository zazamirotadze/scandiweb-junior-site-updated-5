import React, { Component } from 'react';
import CategoryBtns from './CategoryBtns';


export default class Nav extends Component {
   
    render(){
        return(
           <CategoryBtns
            client = {this.props.client}
           />
        )
    }
}