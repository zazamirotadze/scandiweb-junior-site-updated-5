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
    const renderAttributes =this.props.attributes.map(element=> {
      
      const hasYesOrNo = element.items.some(item => item.value === "Yes" || item.value === "No");
     
      if(element.type === "swatch"){
        return <RenderColor
        key={element.id}
          attribute = {element}
          upperCase={true}
          selectMethod={this.selectAttributesAndValues}
          location={this.props.location}
        />
      }else if (hasYesOrNo){
        
            return <RenderCheckbox
            key={element.id}
            attribute = {element}
            upperCase={true}
            selectMethod={this.selectAttributesAndValues}
            location={this.props.location}
          />
        
      }
      else{
          return <RenderOptions
          key={element.id}
          attribute = {element}
          upperCase={true}
          selectMethod={this.selectAttributesAndValues}
          location={this.props.location}
        />
      }
  
      
    })
    return (
      <div className='filters' >
        <div>{filterWord}</div>
        <div>
          {renderAttributes}
          </div>
      </div>
   
    )
  }
}



