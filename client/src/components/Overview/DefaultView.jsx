import React, { useState, useEffect } from 'react';
import Promise from 'bluebird';
import ImageGalleryComponents from '../../styled-components/overviewcomponents/image-gallery-components.jsx';

// default view for image gallery
function DefaultView({
  selectedStyle, mainImage, setMainImage, displayModal, setDisplayModal,
  setOpenQuantity, setOpenSize
}) {
  const [isLoading, setIsLoading] = useState(true);

  const loadStyle = () => {
    // get the first image of the selected style and make it the main image
    function getMainImage() {
      setIsLoading(true);
      let didSucceed = false;
      return new Promise((resolve, reject) => {
        if (typeof selectedStyle !== 'undefined') {
          didSucceed = true;
        }
        if (didSucceed === true) {
          resolve(selectedStyle.photos[0].url);
        } else {
          reject(new Error('Not done loading'));
        }
      });
    }

    getMainImage()
      .then((data) => { setMainImage(data); })
      .catch(() => {})
      .finally(setIsLoading(false));
  };

  useEffect(loadStyle, [selectedStyle]);

  const handleExpandedClick = () => {
    setDisplayModal(true);
    setOpenQuantity(false);
    setOpenSize(false);
  };

  React.useEffect(() => {
    if (displayModal) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }
  }, [displayModal]);
  return (
    <>
      {isLoading
        ? null
        : (
          <ImageGalleryComponents.MainPhoto
            src={mainImage}
            alt={selectedStyle?.name}
            onClick={() => handleExpandedClick()}
          />
        )}
    </>

  );
}

export default DefaultView;
