/* eslint-disable import/extensions */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ProductInformation from './ProductInformation.jsx';
import ImageGallery from './ImageGallery.jsx';
import ExpandedView from './ExpandedView.jsx';
import OverviewContainer from '../../styled-components/overviewcomponents/overview-components.jsx';

function Overview({ currentProduct, currentProductID, reviewData }) {
  const [styles, setStyles] = useState({});
  const [selectedStyle, setSelectedStyle] = useState({});
  const [selectedStylePrice, setSelectedStylePrice] = useState('');
  const [selectedStyleSalePrice, setSelectedStyleSalePrice] = useState('');
  const [selectedStyleName, setSelectedStyleName] = useState('');
  const [selectedStylePhoto, setSelectedStylePhoto] = useState([]);
  const [mainImage, setMainImage] = useState('');
  const [displayModal, setDisplayModal] = React.useState(false);
  const [openQuantity, setOpenQuantity] = useState(false);
  const [openSize, setOpenSize] = useState(false);

  const [expandedMainImage, setExpandedMainImage] = useState('');

  const loadMainImageToExpanded = () => {
    // change expanded view main image when in expanded view
    function getExpandedImage() {
      let didSucceed = false;
      return new Promise((resolve, reject) => {
        if (typeof mainImage !== 'undefined') {
          didSucceed = true;
        }
        if (didSucceed === true) {
          resolve(mainImage);
        } else {
          reject(new Error('Not done loading'));
        }
      });
    }

    getExpandedImage()
      .then((data) => {
        setExpandedMainImage(data);
      })
      .catch(() => { });
  };

  useEffect(loadMainImageToExpanded, [mainImage, displayModal]);

  // get the styles of the current product
  const loadProductStyles = () => {
    const options = {
      url: '/api/product/styles',
      params: {
        currentProductID,
      },
    };
    axios({
      method: 'get',
      url: options.url,
      params: options.params,
      responseType: 'json',
    })
      .then((response) => {
        setStyles(response.data);
        setSelectedStyle(response.data.results[0]);
      })
      .catch((error) => console.log('Error', error.message));
  };

  useEffect(loadProductStyles, [currentProductID]);

  return (
    <div className="overview">
      <OverviewContainer.StyledOverviewContainer>
        <ImageGallery
          currentProduct={currentProduct}
          selectedStyle={selectedStyle}
          mainImage={mainImage}
          setMainImage={setMainImage}
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
          setOpenQuantity={setOpenQuantity}
          setOpenSize={setOpenSize}
        />
        <ExpandedView
          currentProduct={currentProduct}
          selectedStyle={selectedStyle}
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
          expandedMainImage={expandedMainImage}
          setExpandedMainImage={setExpandedMainImage}
        />
        <ProductInformation
          currentProduct={currentProduct}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          selectedStylePrice={selectedStylePrice}
          setSelectedStylePrice={setSelectedStylePrice}
          selectedStyleSalePrice={selectedStyleSalePrice}
          setSelectedStyleSalePrice={setSelectedStyleSalePrice}
          selectedStyleName={selectedStyleName}
          setSelectedStyleName={setSelectedStyleName}
          setSelectedStylePhoto={setSelectedStylePhoto}
          mainImage={mainImage}
          styles={styles}
          reviewData={reviewData}
          openQuantity={openQuantity}
          setOpenQuantity={setOpenQuantity}
          openSize={openSize}
          setOpenSize={setOpenSize}
        />
      </OverviewContainer.StyledOverviewContainer>
    </div>
  );
}

export default Overview;
