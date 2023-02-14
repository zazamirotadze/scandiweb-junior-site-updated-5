import React, { Component } from 'react';
import Category from './Category';
import Nav from './Nav';
class App extends Component {
  
  render() {
    return (
      <div>
        <Nav client = {this.props.client} />
        <Category/>
      </div>
    );
  }
}

export default App;