import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LoadMoreAnswerButton } from '../styled-components/Buttons.styles.jsx';
import ThemeContext from '../../ThemeContext.jsx';

function LoadMoreAnswersButton({ onClick, expanded }) {
  const { theme } = useContext(ThemeContext);
  return (
    <LoadMoreAnswerButton type="button" onClick={onClick} $theme={theme}>{expanded ? 'Collapse answers' : 'See more answers'}</LoadMoreAnswerButton>
  );
}

LoadMoreAnswersButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
};

export default LoadMoreAnswersButton;