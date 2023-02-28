import { gql } from '@apollo/client';

export default  gql`
  query product($id: String! ) {
	product(id:$id){
    id
    name
    inStock
    gallery
    description
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
  	prices{
      currency{
        label
        symbol
      }
      amount
    }
    brand
  }
}
`;