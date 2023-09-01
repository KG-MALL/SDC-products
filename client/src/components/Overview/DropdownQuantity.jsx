import React, { useState, useEffect, useContext } from 'react';
import ProductInformationComponents from '../../styled-components/overviewcomponents/product-information-components.jsx';
import ThemeContext from '../ThemeContext.jsx';

// quantity of a size of the selected style
function DropdownQuantity({
  size, quantity, setQuantity, openQuantity, setOpenQuantity,
  selectedStyle, SKUValueArray, setOneOutOfStock

}) {
  const { theme } = useContext(ThemeContext);
  const maxQuantity = 15;
  const [quantityArray, setQuantityArray] = useState([]);

  const loadMaxQuantity = () => {
    setOneOutOfStock(false);
    // get the max quantity of the SKU, either 15 or the SKU's quantity if below 15
    function getQuantity() {
      let didSucceed = false;
      return new Promise((resolve, reject) => {
        if (typeof SKUValueArray !== 'undefined') {
          didSucceed = true;
        }
        if (didSucceed === true) {
          resolve(SKUValueArray);
        } else {
          reject(new Error('Not done loading'));
        }
      });
    }
    getQuantity()
      .then((data) => {
        const maxQuantitiesArray = [];
        // if quantity is greater than 15, set quantity to 15
        for (let y = 0; y < data.length; y++) {
          if (data[y].quantity > 15) {
            maxQuantitiesArray[y] = maxQuantity;
          } else {
            maxQuantitiesArray[y] = data[y].quantity;
          }
        }
        const tempArray = Array.from(Array(maxQuantitiesArray[size])).map((e, i) => i + 1);
        setQuantityArray(tempArray);
        if (tempArray.length === 0) {
          setOneOutOfStock(true);
        }
      })
      .catch(() => { });
  };

  useEffect(loadMaxQuantity, [selectedStyle, size]);

  const dropdownMenuQuantityHandler = () => {
    setOpenQuantity(!openQuantity);
  };

  const dropdownQuantityHandler = (e) => {
    setQuantity(e.target.value);
    setOpenQuantity(!openQuantity);
  };
  return (
    <div>
      Quantity:
      <br />
      {quantityArray.length === 0
        ? (
          <div className="dropdownQuantity">
            <ProductInformationComponents.StyledDropdownButtonDisabled disabled type="button" className="menuItem" value={0} onClick={(e) => { dropdownQuantityHandler(e); }}>Out of Stock</ProductInformationComponents.StyledDropdownButtonDisabled>
          </div>
        )
        : null }
      {/* size selected but no quantity selected */}
      {size > -1 && quantity === -1 && quantityArray.length !== 0 ? (
        <ProductInformationComponents.Dropdown>
          <ProductInformationComponents.StyledDropdownButton type="button" onClick={() => { dropdownMenuQuantityHandler(); }}>Select Quantity</ProductInformationComponents.StyledDropdownButton>
          {/* dropdown menu opened */}
          {quantityArray && openQuantity
            ? (
              <ProductInformationComponents.Menu $theme={theme}>
                {(quantityArray.map((i) => (
                  <li key={i}>
                    <button type="button" className="menuItem" key={i} value={i} onClick={(e) => { dropdownMenuQuantityHandler(); dropdownQuantityHandler(e); }}>{i}</button>
                  </li>
                )))}
              </ProductInformationComponents.Menu>
            )
            : null}
        </ProductInformationComponents.Dropdown>
      ) : null}
      {/* size selected and quantity selected */}
      {quantityArray && quantity > -1 && quantityArray.length !== 0 ? (
        <ProductInformationComponents.Dropdown>
          <ProductInformationComponents.StyledDropdownButton type="button" onClick={() => { dropdownMenuQuantityHandler(); }}>{quantity}</ProductInformationComponents.StyledDropdownButton>
          {/* dropdown menu opened */}
          {quantityArray && openQuantity
            ? (
              <ProductInformationComponents.Menu $theme={theme}>
                {(quantityArray.map((i) => (
                  <li key={i}>
                    <button type="button" className="menuItem" key={i} value={i} onClick={(e) => { dropdownQuantityHandler(e); }}>{i}</button>

                  </li>
                )))}
              </ProductInformationComponents.Menu>
            )
            : null}
        </ProductInformationComponents.Dropdown>
      ) : null}

      {size === -1 && quantityArray.length !== 0 ? (
        <div className="dropdownQuantity">
          <ProductInformationComponents.StyledDropdownButtonDisabled
            disabled
            type="button"
            onClick={() => {
              dropdownMenuQuantityHandler();
            }}
          >
            -
          </ProductInformationComponents.StyledDropdownButtonDisabled>
        </div>
      ) : null }
      {' '}

    </div>
  );
}

export default DropdownQuantity;
