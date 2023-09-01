import React, { useContext } from 'react';
import { StyledButton } from '../../styled-components/common-elements.jsx';
import RelatedContext from './RelatedContext.jsx';
import ThemeContext from '../ThemeContext.jsx';

const RemoveItemButton = function ({ item }) {
  const { removeFromOutfit } = useContext(RelatedContext);
  const { theme } = useContext(ThemeContext);

  return <StyledButton onClick={(event) => removeFromOutfit(item, event)} $theme={theme} style={{
    'opacity': '0.6',
    'borderRadius': '0',
  }}>X</StyledButton>;
};

export default RemoveItemButton;
