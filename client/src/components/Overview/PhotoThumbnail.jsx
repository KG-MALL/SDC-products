import React from 'react';
import ImageGalleryComponents from '../../styled-components/overviewcomponents/image-gallery-components.jsx';

// render photo as a current thumbnail if it is the focalItem, else render as regular thumbnail
function PhotoThumbnail({
  photoObj,
  selectedStyle,
  focalItem,
  selectedStyleArray,
  index
}) {
  let altName = '';
  altName += `${selectedStyle.name} ${index}`;
  return (
    <div>
      {selectedStyleArray[focalItem].url === photoObj.url
        ? (
          <ImageGalleryComponents.CurrentThumbnail
            src={photoObj.thumbnail_url}
            alt={altName}
            value={selectedStyle.name}
          />
        ) : (
          <ImageGalleryComponents.DefaultThumbnail
            src={photoObj.thumbnail_url}
            alt={altName}
            value={selectedStyle.name}
          />
        )}
    </div>
  );
}

export default PhotoThumbnail;
