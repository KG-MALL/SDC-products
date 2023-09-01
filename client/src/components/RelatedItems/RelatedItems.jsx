import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';

import ItemList from './ItemList.jsx';
import RelatedContext from './RelatedContext.jsx';
import ThemeContext from '../ThemeContext.jsx';

import ComparisonTable from './ComparisonTable.jsx';
import { StyledButton, ModalWrapper, Modal, ModalContent } from '../../styled-components/common-elements.jsx';

const RelatedItems = function ({ currentProduct, updateProduct }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [outfit, setOutfit] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [comparedItem, setComparedItem] = useState({});
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    axios.get('/api/product/related', {
      params: {
        currentProductID: currentProduct.id,
      },
      responseType: 'json',
    })
      .then((response) => {
        setRelatedProducts(response.data);
      })
      .catch((error) => error.message);
  }, [currentProduct]);

  useEffect(() => {
    const storedOutfit = localStorage.getItem('yourOutfit');
    if (storedOutfit) {
      const outfitArray = JSON.parse(storedOutfit);
      setOutfit(outfitArray);
    }
  }, [currentProduct]);

  // only if item doesn't already exist
  const addToOutfit = (item) => {
    const storedOutfit = localStorage.getItem('yourOutfit');
    let outfitArray = [];
    if (storedOutfit) {
      outfitArray = JSON.parse(storedOutfit);
    }
    if (!outfitArray.find((i) => i.id === item.id)) {
      outfitArray.unshift(item);
    }
    setOutfit(outfitArray);
    localStorage.setItem('yourOutfit', JSON.stringify(outfitArray));
  };

  const removeFromOutfit = (item, event) => {
    event.stopPropagation();
    const storedOutfit = localStorage.getItem('yourOutfit');
    let outfitArray = [];
    if (storedOutfit) {
      outfitArray = JSON.parse(storedOutfit);
    }
    outfitArray = outfitArray.filter((i) => i.id !== item.id);
    setOutfit(outfitArray);
    localStorage.setItem('yourOutfit', JSON.stringify(outfitArray));
  };

  const compareItem = (item, event) => {
    event.stopPropagation();
    //window.event.cancelBubble = true; research later: possibly necessary for IE?
    if (item) {
      setComparedItem(item);
      setShowTable(true);
    } else {
      setShowTable(false);
    }
  };

  return (
    <div className="relatedItems">
      <center>
        <RelatedContext.Provider value={{ removeFromOutfit, compareItem }}>
          { relatedProducts.length === 0 ? <h2>No related items!</h2> : <h2>Related Items</h2>}
          { relatedProducts.length > 0 && <ItemList products={relatedProducts} updateProduct={updateProduct} listType="related" /> }
          <ModalWrapper $displaymodal={showTable}>
            <Modal $displaymodal={showTable} style={{ 'backgroundColor': 'white' }}>
              <ModalContent $displaymodal={showTable} style={{ 'backgroundColor': 'white' }}>
                { showTable
                &&
                <ComparisonTable currentProduct={currentProduct} comparedProduct={comparedItem} /> }
              </ModalContent>
            </Modal>
          </ModalWrapper>
          { outfit.length === 0 ? <h2 style={{ 'paddingTop':
          '40px'}}>No outfit yet!</h2> : <h2 style={{ 'paddingTop':
          '40px'}}>Your Outfit</h2>}
          {!outfit.find((i) => i.id === currentProduct.id) && (
            <StyledButton onClick={() => addToOutfit(currentProduct)} $theme={theme}>
              Add {currentProduct.name} to Your Outfit
            </StyledButton>
          )}
          { outfit.length > 0 && <ItemList products={outfit} updateProduct={updateProduct} listType="outfit" /> }
        </RelatedContext.Provider>
      </center>
    </div>
  );
};

export default RelatedItems;
