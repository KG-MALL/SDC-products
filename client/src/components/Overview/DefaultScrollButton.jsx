import React from 'react';
import ImageGalleryComponents from '../../styled-components/overviewcomponents/image-gallery-components.jsx';

const DefaultScrollButton = function ({scroll, dir}) {
  return <ImageGalleryComponents.ScrollButton type="button" value={dir === 'left' ? '<' : '>'} onClick={scroll} />;
};

export default DefaultScrollButton;
