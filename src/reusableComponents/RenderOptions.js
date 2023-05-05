import React, {Component} from 'react';
import { colon, getQueryParams, hasQueryParam } from '../reuseableFunctionsandVariables/reuseableFunctionsAndVariables';



export default class RenderOptions extends Component {
  render() {
    const currentSearchParams = this.props.location && new URLSearchParams(this.props.location.search);
    const entries = this.props.location && currentSearchParams.entries();
    const queryParams = getQueryParams(entries);  
    // color variebles
    const styles = window.getComputedStyle(document.documentElement);
    const colorBlack = styles.getPropertyValue('--color-black') ;
    const colorWhite = styles.getPropertyValue('--color-white');
    //

    const { attribute, /* attribute,*/ upperCase, selectMethod} = this.props
    const renderOptions = attribute && attribute.items.map((element) => {
      const isSelected = hasQueryParam(queryParams,attribute.name, element.id)
      let selected 
      if(element.isSelected !== undefined){
        selected = element.isSelected
      }else{
        selected = isSelected
      }   
      return (
        <option 
          disabled={!selectMethod}
          key={element.id}
          className={upperCase ? "bigOption" : "smallOption"}
          style={{
            backgroundColor: selected? `${colorBlack} ` : `${colorWhite}`,
            color: selected ? `${colorWhite}` : `${colorBlack}`
          }}
        onClick={()=> { 
            selectMethod && selectMethod(element.id, attribute.name)
          }} 
          
        
        > 
          {element.value} 
        </option>
      )
    })
    return (
      <>
     {renderOptions ? 
        <div className='options-component '>
            <h4 className={upperCase ? undefined : "smallAttributeWord"}>{upperCase? `${attribute.name.toUpperCase()}${colon}` : `${attribute.name}${colon}`} </h4>
            <select  className={upperCase ? "bigSelect" : "smallSelect"} key={attribute.items.filter(e =>  e.isSelected).map(e => e.id).join(',')} 
            size={attribute.items.length === 1 ? attribute.items.length + 1 : attribute.items.length}  
            
            >
              {renderOptions}
            </select>

        </div> : ""}
      </>
    );
  }
}

