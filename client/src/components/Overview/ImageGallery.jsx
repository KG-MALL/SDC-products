import React from 'react';
import OverviewContainer from '../../styled-components/overviewcomponents/overview-components.jsx';
import ImageGalleryComponents from '../../styled-components/overviewcomponents/image-gallery-components.jsx';
import DefaultView from './DefaultView.jsx';
import DefaultThumbnails from './DefaultThumbnails.jsx';

function ImageGallery({
  selectedStyle,
  mainImage,
  setMainImage,
  displayModal,
  setDisplayModal,
  expandedMainImage,
  setExpandedMainImage,
  setOpenQuantity,
  setOpenSize,
}) {
  return (
    <OverviewContainer.Half>
      <ImageGalleryComponents.DefaultContainer data-testid="imageGallery">
        <DefaultView
          selectedStyle={selectedStyle}
          mainImage={mainImage}
          setMainImage={setMainImage}
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
          expandedMainImage={expandedMainImage}
          setExpandedMainImage={setExpandedMainImage}
          setOpenQuantity={setOpenQuantity}
          setOpenSize={setOpenSize}
        />
        <DefaultThumbnails
          selectedStyle={selectedStyle}
          setMainImage={setMainImage}
          expandedMainImage={expandedMainImage}
          setExpandedMainImage={setExpandedMainImage}
          setOpenQuantity={setOpenQuantity}
          setOpenSize={setOpenSize}
        />
      </ImageGalleryComponents.DefaultContainer>
    </OverviewContainer.Half>
  );
}

export default ImageGallery;
