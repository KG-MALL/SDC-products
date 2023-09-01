import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RoundedPulseButton } from '../styled-components/Buttons.styles.jsx';
import { StyledButton } from '../../../styled-components/common-elements.jsx';
import ThemeContext from '../../ThemeContext.jsx';
function LoadMoreQuestionsButton({ onClick, hasMoreQuestions }) {
  const { theme } = useContext(ThemeContext)
  // if false, return null. Nothing will be rendered.
  if (!hasMoreQuestions) return null;

  return (
    <StyledButton type="button" onClick={onClick} $theme={theme}>More Answered Questions</StyledButton>
  );
}

LoadMoreQuestionsButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  hasMoreQuestions: PropTypes.bool.isRequired,
};

export default LoadMoreQuestionsButton;