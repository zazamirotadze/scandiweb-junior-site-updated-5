import React, { Component } from 'react'
import RenderColor from '../reusableComponents/RenderColor'
import RenderOptions from '../reusableComponents/RenderOptions'
import RenderCheckbox from '../reusableComponents/RenderCheckbox'
import { filterWord } from '../reuseableFunctionsandVariables/reuseableFunctionsAndVariables'
export default class FiltersComponet extends Component {

  selectAttributesAndValues = (idValue, attributeName)=>{
  const currentSearchParams = new URLSearchParams(this.props.location.search);
  const existingValues = currentSearchParams.getAll(attributeName);

  if (existingValues.includes(idValue)) {
    // If attribute value already exists, remove it
    currentSearchParams.delete(attributeName);
    existingValues.filter((value) => value !== idValue).forEach((value) => {
      currentSearchParams.append(attributeName, value);
    });
  } else if (existingValues.length > 0) {
    // If attribute already exists, append new value
    existingValues.push(idValue);
    currentSearchParams.delete(attributeName);
    existingValues.forEach((value) => {
      currentSearchParams.append(attributeName, value);
    });
  } else {
    // If attribute doesn't exist, add new attribute and value
    currentSearchParams.set(attributeName, idValue);
  }

  const newSearchParams = currentSearchParams.toString();
  this.props.history.push({
    pathname: this.props.location.pathname,
    search: `?${newSearchParams}`
  });
    

  }
  render() {
    return (
      <div className='filters' >
        <div>{filterWord}</div>
        <div>
          <RenderOptions
            attributes = {this.props.attributes}
            attribute = {this.props.allAttributesId[0]}
            upperCase={true}
            selectMethod={this.selectAttributesAndValues}
            location={this.props.location}
          
            />
            <RenderOptions
                attributes = {this.props.attributes}
                attribute = {this.props.allAttributesId[2]}
                upperCase={true}
                selectMethod={this.selectAttributesAndValues}
                location={this.props.location}
            />
            <RenderColor
                attributes = {this.props.attributes}
                attribute = {this.props.allAttributesId[1]}
                upperCase={true}
                selectMethod={this.selectAttributesAndValues}
                location={this.props.location}
            />
            <RenderCheckbox
                attributes = {this.props.attributes}
                attribute = {this.props.allAttributesId[3]}
                upperCase={true}
                selectMethod={this.selectAttributesAndValues}
                location={this.props.location}
            />
            <RenderCheckbox
                attributes = {this.props.attributes}
                attribute = {this.props.allAttributesId[4]}
                upperCase={true}
                selectMethod={this.selectAttributesAndValues}
                location={this.props.location}
            />
          </div>
      </div>
   
    )
  }
}



