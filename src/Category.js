import React, { Component } from 'react'
import {  gql } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
const MY_QUERY = gql`
    query {
    categories {
    name
    products {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      brand
    }
  }
}
`;
export default class Category extends Component {
    
  render() {
    return (
      <div>
        <Query query={MY_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>Error</div>;
            return <div>cdcdd</div>;
          }}
        </Query>
      </div>
    )
  }
}
