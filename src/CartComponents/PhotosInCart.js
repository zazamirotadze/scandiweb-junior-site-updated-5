import React, { Component } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

export default class PhotosInCart extends Component {
  state={
    src: 0
  }
  increaseSrcNumber(){
    if (this.props.gallery.length > this.state.src +1){
      this.setState({src: this.state.src +1})
    }
    if (this.props.gallery.length === this.state.src +1){
      this.setState({src: 0})
    }
  }
  decreaseSrcNumber(){
  
    if (this.state.src > 0){
      this.setState({src: this.state.src -1})
    }

    if (this.state.src === 0){
      this.setState({src: this.props.gallery.length -1})
    }
    
  }
  render() {
    return (
      <div className='photosIncart' >
        {this.props.gallery.length > 1 &&
            <>
              <div><MdKeyboardArrowLeft onClick={() => this.decreaseSrcNumber()} /></div>
              <div><MdKeyboardArrowRight onClick={() => this.increaseSrcNumber()}/></div>
            </>
        }
        <img src={this.props.gallery[this.state.src]} alt="cardPhoto" />
      </div>
    )
  }
}
