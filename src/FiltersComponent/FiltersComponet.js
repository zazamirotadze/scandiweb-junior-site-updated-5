import React, { Component } from 'react'
import RenderColor from '../reusableComponents/RenderColor'
import RenderOptions from '../reusableComponents/RenderOptions'
import RenderCheckbox from '../reusableComponents/RenderCheckbox'
import { filterWord } from '../reuseableFunctionsandVariables/reuseableFunctionsAndVariables'
export default class FiltersComponet extends Component {
  render() {
    
    return (
      <div className='filters' >
        <div>{filterWord}</div>
        <div>
          <RenderOptions
            attributes = {this.props.attributes}
            attribute = {this.props.allAttributesId[0]}
            upperCase={true}
            selectMethod={this.props.modifyFiltersData}
            />
            <RenderOptions
                attributes = {this.props.attributes}
                attribute = {this.props.allAttributesId[2]}
                upperCase={true}
                selectMethod={this.props.modifyFiltersData}
            />
            <RenderColor
                attributes = {this.props.attributes}
                attribute = {this.props.allAttributesId[1]}
                upperCase={true}
                selectMethod={this.props.modifyFiltersData}
            />
            <RenderCheckbox
                attributes = {this.props.attributes}
                attribute = {this.props.allAttributesId[3]}
                upperCase={true}
                selectMethod={this.props.modifyFiltersData}
            />
            <RenderCheckbox
                attributes = {this.props.attributes}
                attribute = {this.props.allAttributesId[4]}
                upperCase={true}
                selectMethod={this.props.modifyFiltersData}
            />
          </div>
      </div>
   
    )
  }
}
