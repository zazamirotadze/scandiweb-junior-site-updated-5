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
export function getQueryParams(entries) {
  const queryParams = [];
  if(entries !==undefined){
    for (const entry of entries) {
      const key = entry[0];
      const value = entry[1];

      queryParams.push({ [key]: value });
    }
  }
  return queryParams;
}

export function hasQueryParam(queryParams, name, value) {
  return queryParams.some(param => {
    return Object.keys(param).includes(name) && param[name] === value;
  });
} 

export function filterProducts( products, queryParams ){
  let filteredProducts  = products.filter(product => {
    for (let i = 0; i < queryParams.length; i++) {
      let attrName = Object.keys(queryParams[i])[0];
      let attrValue = Object.values(queryParams[i])[0];
      let matchingAttr = product.attributes.find(attr => attr.name === attrName);
      if (!matchingAttr || !matchingAttr.items.some(item => item.id === attrValue)) {
        return false;
      }
    }
    return true;
  });
  return filteredProducts
}
export function handleParamsParsingFromPath(pathname) {
  const params = pathname.split("/")[2]; 
  if (!params) {
    return [];
  }
  const paramArray = params.split("&"); 
  const result = paramArray.map((param) => {
    const [key, value] = param.split("="); 
    const decodedKey = decodeURIComponent(key.replace(/\+/g, ' '));
    const decodedValue = decodeURIComponent(value.replace(/\+/g, ' '));
    return { [decodedKey]: decodedValue }; 
  });
  return result;
}

export function filterAttributes(a, b) {
  return b.map((attr) => {
    const filterAttrs = a.filter((item) => Object.keys(item)[0] === attr.name);
    if (filterAttrs.length > 0) {
      const filterValues = filterAttrs.flatMap((item) => Object.values(item)[0]);
      const filteredItems = attr.items.filter((item) => filterValues.includes(item.id));
      return { ...attr, items: filteredItems };
    } else {
      return attr;
    }
  });
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