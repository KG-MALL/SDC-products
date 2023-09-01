import React from 'react';
import ProductInformationComponents from '../../styled-components/overviewcomponents/product-information-components.jsx';

// display style thumbnail and check if this entry is the selected style
function styleEntry({
  style, setSelectedStyle, selectedStyleName,
}) {
  return (

    <div>
      <ProductInformationComponents.EntryContainer>
        {selectedStyleName === style.name ? (
          <ProductInformationComponents.ClickedStyleThumbnail>
            <span>✓</span>
          </ProductInformationComponents.ClickedStyleThumbnail>
        ) : (null)}
        <ProductInformationComponents.StyleEntryThumbnail
          src={style.photos[0].thumbnail_url}
          alt={style.name}
          value={style.name}
          onClick={() => { setSelectedStyle(style); }}
        />
      </ProductInformationComponents.EntryContainer>
    </div>
  );
}

export default styleEntry;
