import { gql } from '@apollo/client';

export default  gql`
  query Category($input: CategoryInput!) {
    category(input: $input) {
      products{
        id
        name
        inStock
        gallery
        category
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
        prices {
            amount
            currency {
              symbol
            }
        }
        brand
      }
    }
  }
`;




