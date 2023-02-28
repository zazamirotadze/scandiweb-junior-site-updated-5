import React, { Component } from 'react'
import { colon } from '../reuseableFunctionsandVariables/reuseableFunctionsAndVariables';




export default class RenderCheckbox extends Component {
  render() {
    // color variebles
    const styles = window.getComputedStyle(document.documentElement);
    const colorBlack = styles.getPropertyValue('--color-black');
    const colorWhite = styles.getPropertyValue('--color-white');
    //

    const { attributes, attribute, upperCase, selectMethod } = this.props
    const object = attributes.find(element => element.id === attribute);
    
    const  renderOptions =  object && object.items.map((element) => {  
        return (

            <label
              key={element.id}
              
              style={{
                backgroundColor: element.isSelected ? `${colorBlack}` : `${colorWhite}`,
                color: element.isSelected ? `${colorWhite}`  : `${colorBlack}` ,
              }}
              onClick={()=> selectMethod && !upperCase && selectMethod(element.id, object.name)} 
              
            >
            <input
              type="checkbox"
              checked={element.isSelected}
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
