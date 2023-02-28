export function givePriceTwoDigits(price) {
    const roundedPrice = price.toFixed(2);
    const [whole, fraction] = roundedPrice.split('.');
    return `${whole}.${fraction.padEnd(2, '0')}`;
}

export function getTotalQuantity(cartData){
    const totalQuantity = cartData.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
      return totalQuantity
}

export function getTax21(totalSum) {
    return totalSum*0.21
}

export function getTotalSum (cartData, selectedCurrencySymbol) {
    const totalSum = cartData.reduce((prev, item) => {
       const priceObject = item.prices.find((element => element.currency.symbol === selectedCurrencySymbol))
       return prev + (priceObject.amount * item.quantity);
    },0)
    return totalSum
};


/////////// functions for filters
export function fetchAllAttributesAndValues(attributesData){
    const attributes = attributesData.reduce((acc, product) => {
        product.attributes.forEach(attribute => {
          const existingAttribute = acc.find(a => a.id === attribute.id);
          if (existingAttribute) {
            attribute.items.forEach(item => {
              if (!existingAttribute.items.find(i => i.id === item.id)) {
                existingAttribute.items.push(item);
              }
            });
          } else {
            acc.push(attribute);
          }
        });
        return acc;
      }, []);

    return attributes
}


export function selectedAttributesFetcher(attributes){
  const selectedAttributes = [];
  attributes.forEach((attribute) => {
  const selectedItems =  attribute.items.filter((item) => item.isSelected);
  if (selectedItems.length > 0) {
      const itemValues = selectedItems.map((item) => item.displayValue);
      selectedAttributes.push({ name: attribute.name, items: itemValues });
      }
  });
  return selectedAttributes
}
export function filterByAttributeName(selectedAttributes, productsData){
    // filter by attribute name
    const namesArray = attributesNameArrayCreator(selectedAttributes)
    const filteredProducts = productsData.filter(product =>
    namesArray.some(attributeToFilter =>
      product.attributes.some(attribute =>
          attribute.name === attributeToFilter
        ))
      );
    return  filteredProducts
    //
}
export function filterByAttributeValue(selectedAttributes,filteredProducts,productsData){
 
      // then filter by attrubute value
      const itemsArray = attributesValueArrayCreator(selectedAttributes)
      const filteredObjects = filteredProducts.filter(obj => {
        return obj.attributes.some(attr => {
          if (Array.isArray(attr.items)) {
        
            return attr.items.some(item => itemsArray.includes(item.id));
          }
          return false;
        });
      });
      //
      if(filteredObjects.length===0){
          return productsData
      } else{
          return filteredObjects
      }
}
export function attributesNameArrayCreator(selectedAttributes){
      // filter by attribute name
      const namesArray = selectedAttributes.map(obj => obj.name);
      //
      return namesArray
}

export function attributesValueArrayCreator(selectedAttributes){
  // filter by attribute values
  const itemsArray = [];
  selectedAttributes.forEach((obj) => {
    itemsArray.push(...obj.items);
  });
  //
  return itemsArray
}
 export function filterByAttributeValueAndName(attributes, selectedAttributes){
    attributes = attributes.map(dObj => {
      const cObj = selectedAttributes.find(cObj => cObj.name === dObj.name);
      if (cObj) {
        const validItemValues = cObj.items;
        dObj.items = dObj.items.filter(item => validItemValues.includes(item.id));
      }
      return dObj;
    }); 
    return attributes
 }


 export function filteredattributesValuesDetails(attributes, filteredattributesValues){
    const filteredattributesValuesDetails = [];
    if(attributes){
      attributes.forEach(attr => {
        attr.items.forEach(item => {
          if (filteredattributesValues.includes(item.id)) {
            filteredattributesValuesDetails.push(item.id);
          }
        });
      });
    }
    return  filteredattributesValuesDetails
 }


export function filterAByB(A, B) {
  for (let b of B) {
    let a = A.find((item) => item.id === b.id);
    if (a && b.items.length > 0) {
      a.items = b.items;
    }
  }
  return A;
}
//////////////////////////////////////////////
export  const outOfStockWord = "OUT OF STOCK"
export const addToCartWord = "ADD TO CART"
export  const cartWord = "CART"
export const colon = ":"
export const tax21Word = "Tax 21%"
export const quantityWord = "Quantity"
export const TotalWord = "Total"
export const orderWord = "ORDER"
export const myBagWord = "My Bag."
export const itemsWord = "items"
export const viewBagWord = "VIEWBAG"
export const checkoutWord = "CHECK OUT"
export const  filterWord =  "Filter by attributes values"