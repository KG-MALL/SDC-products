import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { YesAndReportButton, YesReportSpan } from '../src/styled-components/YesAndReportButton.styles.jsx';
import ThemeContext from '../src/components/ThemeContext.jsx';

function ReportButton({ initialReported, onReportClick }) {
  const { theme } = useContext(ThemeContext);
  const [isReported, setIsReported] = useState(initialReported);
  // State to check if the user has clicked "Yes" or not
  const [clicked, setClicked] = useState(false);

  const handleReportClick = (e) => {
    e.preventDefault();
    if (!clicked) {
      setIsReported(true);
      setClicked(true);
      onReportClick();
    }
  };
  return (
    <p>
      <YesAndReportButton type="button" onClick={handleReportClick} disabled={clicked} $theme={theme}>
        {isReported ? <YesReportSpan>Reported</YesReportSpan>
          : <YesReportSpan>Report</YesReportSpan>}
      </YesAndReportButton>
    </p>
  );
}

ReportButton.propTypes = {
  initialReported: PropTypes.bool,
  onReportClick: PropTypes.func.isRequired,
};

ReportButton.defaultProps = {
  initialReported: false,
};

export default ReportButton;
