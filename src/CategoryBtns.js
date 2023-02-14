import React, { Component } from 'react';
import { gql } from '@apollo/client';


const MY_QUERY = gql`
  query {
    categories {
      name
    }
  }
`;



export default class CategoryBtns extends Component {
  state = {
    category0: '',
    category1: '',
    category2: '',
  };

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = () => {
    this.props.client
      .query({
        query: MY_QUERY,
      })
      .then((result) => {
        const categories = result.data.categories;
        this.setState({
          category0: categories[0].name,
          category1: categories[1].name,
          category2: categories[2].name,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { category0, category1, category2 } = this.state;
    return (
      <div>
        <div>{category0}</div>
        <div>{category1}</div>
        <div>{category2}</div>
      </div>
    );
  }
}