import React, { useContext } from 'react';
import { StyledButton } from '../../styled-components/common-elements.jsx';
import ThemeContext from '../ThemeContext.jsx';

const ScrollButton = function ({ scroll, dir }) {
  const { theme } = useContext(ThemeContext);

  return <StyledButton onClick={scroll} $theme={theme} style={{
    'borderRadius': '0',
    'transparency': '0.8',
  }}>{dir === 'left' ? '<' : '>'}</StyledButton>;
};

export default ScrollButton;
