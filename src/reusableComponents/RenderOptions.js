import React, {Component} from 'react';
import { colon } from '../reuseableFunctionsandVariables/reuseableFunctionsAndVariables';



export default class RenderOptions extends Component {

  render() {
    // color variebles
    const styles = window.getComputedStyle(document.documentElement);
    const colorBlack = styles.getPropertyValue('--color-black');
    const colorWhite = styles.getPropertyValue('--color-white');
    //

    const { attributes,  attribute, upperCase, selectMethod} = this.props
    const object = attributes.find(element => element.id === attribute);
    const renderOptions = object && object.items.map((element) => {
      
      return (
        <option
          disabled={!selectMethod}
          key={element.id}
          className={upperCase ? "bigOption" : "smallOption"}
          style={{
            backgroundColor: element.isSelected ? `${colorBlack}` : `${colorWhite}`,
            color: element.isSelected ? `${colorWhite}` : `${colorBlack}`
          }}
          onClick={()=> selectMethod && selectMethod(element.id, object.name)} 
        > 
          {element.value} 
        </option>
      )
    });


    return (
      <>
     {renderOptions ? 
        <div className='options-component '>
            <h4 className={upperCase ? undefined : "smallAttributeWord"}>{upperCase? `${object.name.toUpperCase()}${colon}` : `${object.name}${colon}`} </h4>
            <select  className={upperCase ? "bigSelect" : "smallSelect"} key={object.items.filter(e => e.isSelected).map(e => e.id).join(',')} 
            size={object.items.length === 1 ? object.items.length + 1 : object.items.length}  >
              {renderOptions}
            </select>

        </div> : ""}
      </>
    );
  }
}

