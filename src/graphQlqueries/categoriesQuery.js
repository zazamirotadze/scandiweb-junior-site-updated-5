import { gql } from '@apollo/client';

export default gql`
  query {
    categories {
      name
      products {
        attributes{
          id 
          name 
          type
          items{
            id
            displayValue
            value
          }
        }
      }
    }
  }
`;

