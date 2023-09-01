import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { YesAndReportButton, YesReportButtonContainer, HelpfulTextSpan, YesReportSpan } from '../src/styled-components/YesAndReportButton.styles.jsx';
import ThemeContext from '../src/components/ThemeContext.jsx';

function HelpfulYesButton({ initialCount, onHelpfulClick }) {
  const { theme } = useContext(ThemeContext);
  const [helpfulYesCount, setHelpfulYesCount] = useState(initialCount);
  // State to check if the user has clicked "Yes" or not
  const [clicked, setClicked] = useState(false);

  const handleHelpfulYesClick = (e) => {
    e.preventDefault();
    if (!clicked) {
      setHelpfulYesCount(helpfulYesCount + 1);
      setClicked(true);
      onHelpfulClick();
    }
  };
  return (
    <YesReportButtonContainer $theme={theme}>
      <HelpfulTextSpan>Helpful?</HelpfulTextSpan>
      <YesAndReportButton type="button" onClick={handleHelpfulYesClick} $theme={theme}>
        <YesReportSpan>Yes</YesReportSpan>
        {' '}
        (
        {helpfulYesCount}
        )
      </YesAndReportButton>
    </YesReportButtonContainer>
  );
}

HelpfulYesButton.propTypes = {
  initialCount: PropTypes.number,
  onHelpfulClick: PropTypes.func.isRequired,
};

HelpfulYesButton.defaultProps = {
  initialCount: 0,
};

export default HelpfulYesButton;
