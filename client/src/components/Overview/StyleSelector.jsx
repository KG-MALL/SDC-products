import React, { useEffect } from 'react';
import Promise from 'bluebird';
import StyleEntry from './StyleEntry.jsx';
import ProductInformationComponents from '../../styled-components/overviewcomponents/product-information-components.jsx';

function styleSelector({
  stylesArray, selectedStyle, setSelectedStyle, setSelectedStylePrice,
  setSelectedStyleSalePrice, selectedStyleName, setSelectedStyleName,
  setSelectedStylePhoto,
}) {
  // load the information of the current style
  const loadStyles = () => {
    function getStyle() {
      let didSucceed = false;
      return new Promise((resolve, reject) => {
        if (typeof selectedStyle !== 'undefined') {
          didSucceed = true;
        }
        if (didSucceed === true) {
          resolve(selectedStyle);
        } else {
          reject(new Error('Not done loading'));
        }
      });
    }
    getStyle()
      .then((data) => {
        setSelectedStylePrice(data.original_price);
        setSelectedStyleSalePrice(data.sale_price);
        setSelectedStyleName(data.name);
        setSelectedStylePhoto(data.photos[0].url);
      })
      .catch(() => { });
  };
  useEffect(loadStyles, [selectedStyle]);

  return (
    <div>
      <ProductInformationComponents.StyleName>
        <em>Style: </em>
        {selectedStyleName}
      </ProductInformationComponents.StyleName>
      {stylesArray ? stylesArray.map((style, index) => (
        <ProductInformationComponents.StyleEntry data-testid="styleEntry" key={index}>
          <StyleEntry
            style={style}
            setSelectedStyle={setSelectedStyle}
            selectedStyleName={selectedStyleName}

          />
        </ProductInformationComponents.StyleEntry>
      )) : null}
    </div>
  );
}

export default styleSelector;
