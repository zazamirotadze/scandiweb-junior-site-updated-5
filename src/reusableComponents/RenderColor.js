import React, { Component } from 'react'
import { colon, getQueryParams, hasQueryParam } from '../reuseableFunctionsandVariables/reuseableFunctionsAndVariables';

export default class RenderColor extends Component {
  render() {
    const currentSearchParams = this.props.location &&  new URLSearchParams(this.props.location.search);
    const entries = this.props.location &&  currentSearchParams.entries();
    const queryParams = getQueryParams(entries);
    // color variebles
    const styles = window.getComputedStyle(document.documentElement);
    const colorGreen = styles.getPropertyValue('--color-green');
    const colorGrayMiddle = styles.getPropertyValue('--color-gray-middle');
    //
     const { attributes, attribute, upperCase, selectMethod } = this.props
     const object = attributes.find(element => element.id === attribute);
     const  renderOptions =  object && object.items.map((element) => {
        const isSelected = hasQueryParam(queryParams,object.name, element.id)
        let selected 
        if(element.isSelected !== undefined){
          selected = element.isSelected
        }else{
          selected = isSelected
        }   
         return (
 
            <div 
            key={element.id}
            style={{
                background: `${element.displayValue}`,
                border: selected?`3px solid ${colorGreen}`:`3px solid ${colorGrayMiddle}`
                }} 
             className={upperCase ? "bigColor" : "smallColor"}
            onClick={()=> selectMethod && selectMethod(element.id, object.name)} 
            > 
            
            </div>
         )
       
       }  
 
    );
    return (
        <>
          {renderOptions ? 
          <div className='colors-component' >
            <h4 className={upperCase ? undefined : "smallAttributeWord"}>{upperCase? `${object.name.toUpperCase()}${colon}` : `${object.name}${colon}`}</h4>
              <div>
                  {renderOptions}
              </div>
          </div> : ""}
        </>
    )
  }
}
