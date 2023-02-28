import React, { Component } from 'react'
import { outOfStockWord } from '../reuseableFunctionsandVariables/reuseableFunctionsAndVariables'

export default class PhotosInDetails extends Component {
    state = {
        selectedPhoto: ""
    }
    render(){
        const secondaryImages = this.props.gallery.map( element => 
            <img 
                alt='secondaryImg'
                key={element} 
                src={element} 
                onClick = {()=>this.setState({selectedPhoto : element})}
            /> 
        )
        return(
            <div className='photos-detail' >

                <div>{secondaryImages}</div> 
                <div>
                    {! this.props.inStock && <>
                        <div className='overlay-div'></div>
                        <div className='outOfstockWordDiv'>{outOfStockWord}</div>
                    </>}
                    <img alt='mainImg' src={ this.state.selectedPhoto? this.state.selectedPhoto : this.props.gallery[0]} />
                </div>
            </div>
        )
    }
}