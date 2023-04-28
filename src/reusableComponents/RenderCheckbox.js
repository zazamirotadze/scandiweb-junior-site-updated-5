import React, { Component } from 'react'
import { colon, getQueryParams, hasQueryParam } from '../reuseableFunctionsandVariables/reuseableFunctionsAndVariables';




export default class RenderCheckbox extends Component {
  render() {
    const currentSearchParams = this.props.location && new URLSearchParams(this.props.location.search);
    const entries = this.props.location &&  currentSearchParams.entries();
    const queryParams = getQueryParams(entries);
    // color variebles
    const styles = window.getComputedStyle(document.documentElement);
    const colorBlack = styles.getPropertyValue('--color-black');
    const colorWhite = styles.getPropertyValue('--color-white');
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

            <label
              key={element.id}
              
              style={{
                backgroundColor: selected ? `${colorBlack}` : `${colorWhite}`,
                color: selected ? `${colorWhite}`  : `${colorBlack}` ,
              }}
           // onClick={()=> selectMethod && !upperCase && selectMethod(element.id, object.name)} 
              
            >
            <input
              type="checkbox"
              checked={selected}
              style={{ display: "none" }}
            onChange={()=> selectMethod && selectMethod(element.id, object.name)} 
            />
            <div className={upperCase ? "bigOption" : "smallOption"}>
              {element.displayValue}
            </div>
          </label>

        )
      
      }  

  );

    return (
        <>
        {renderOptions ? 
        <div className='chackbox-component' >
          <h4 className={upperCase ? undefined : "smallAttributeWord"}>{upperCase? `${ object.name.toUpperCase()}${colon}` :  `${object.name}${colon}`} </h4>
            <div>
                {renderOptions}
            </div>
         </div> : ""}
         </>
    )
  }
}
