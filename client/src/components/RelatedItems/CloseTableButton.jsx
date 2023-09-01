import React, { useContext } from 'react';
import { StyledButton } from '../../styled-components/common-elements.jsx';
import RelatedContext from './RelatedContext.jsx';
import ThemeContext from '../ThemeContext.jsx';

const CloseTableButton = function () {
  const { compareItem } = useContext(RelatedContext);
  const { theme } = useContext(ThemeContext);

  return <StyledButton onClick={(event) => compareItem(undefined, event)} $theme={theme} >Close</StyledButton>;
};

export default CloseTableButton;
