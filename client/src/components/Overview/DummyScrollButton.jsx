import React from 'react';
import ImageGalleryComponents from '../../styled-components/overviewcomponents/image-gallery-components.jsx';

const DummyScrollButton = function () {
  return (
    <ImageGalleryComponents.ScrollButton
      type="button"
      value=" "
      style={{
        opacity: '0%',
      }}
      disabled
    />
  );
};

export default DummyScrollButton;
