import React from 'react';

// displays a a magnified portion of the image in 2.5 zoom
function ExpandedZoom({
  expandedMainImage, siteWidth, siteHeight, showMagnify, coordinates,
}) {
  const zoomStrength = 2.5;
  const zoomWidth = 300;
  const zoomHeight = 300;

  return (

    <div style={{
      display: showMagnify ? '' : 'none',
      position: 'relative',
      pointerEvents: 'none',
      // magnifer position
      top: `${coordinates[1] - zoomHeight / 2}px`,
      left: `${coordinates[0] + zoomWidth / 1.5}px`,
      backgroundImage: `url('${expandedMainImage}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${siteWidth * zoomStrength}px ${siteHeight * zoomStrength}px`,
      backgroundPositionX: `${-coordinates[0] * zoomStrength + zoomWidth / 2}px`,
      backgroundPositionY: `${-coordinates[1] * zoomStrength + zoomHeight / 2}px`,
      // magnifier border
      border: '2px solid #818589',
      // magnifer dimensions
      height: `${zoomHeight}px`,
      width: `${zoomWidth}px`,
      zIndex: 3000,
    }}
    />

  );
}

export default ExpandedZoom;
