import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ThemeContext from '../components/ThemeContext.jsx';
// this component takes in the rating as well as a font size so each widget can choose size
function StarView({ rating, fontSize }) {
  // BRD indicates that rating should be calculated to the nearest quarter star
  const ratingNearestFourth = (Math.round(rating * 4) / 4).toFixed(2);
  const { theme } = useContext(ThemeContext);

  return (
    <div
      data-testid="starTest"
      className={theme === 'dark' ? 'stars-dark' : 'stars-light'}
      style={
      {
        '--rating': ratingNearestFourth,
        'fontSize': fontSize,
        '--percent': 'calc(var(--rating) / 5 * 100%)',
        'display': 'inline-block',
        'fontFamily': 'Times',
        'lineHeight': 1,
      }
    }
      aria-label={`Rating of this product is ${rating} out of 5.`}
    />
  );
}

StarView.propTypes = {
  rating: PropTypes.number.isRequired,
  fontSize: PropTypes.number.isRequired,
};

const StyledButton = styled.button`
  padding: 15px;
  border-radius: 25px;
  color: ${({ $theme }) => ($theme === 'light' ? 'white' : '#121212')};
  background: ${({ $theme }) => ($theme === 'light' ? '#303030' : '#dfdfdf')};
  cursor: pointer;
  border: ${({ $theme }) => ($theme === 'light' ? '#dfdfdf' : '#303030')};
  &:hover {
    opacity: 0.5;
  }
`;

// $displaymodal is the boolean prop passed into the modal components to determine visibility
const ModalWrapper = styled.div`
  display: ${({ $displaymodal }) => ($displaymodal ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  z-index: 100000;`;

const Modal = styled.div`
  display: ${({ $displaymodal }) => ($displaymodal ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ $theme }) => ($theme === 'light' ? 'white' : '#303030')};
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  height: min-content;
  z-index: 100000;`;

const ModalContent = styled.div`
  display: ${({ $displaymodal }) => ($displaymodal ? 'block' : 'none')};
  background-color: ${({ $theme }) => ($theme === 'light' ? 'white' : '#303030')};
  padding: 20px;
  margin: 20px 0;
  border: 1px solid #888;
  width: 90%;
  max-height: calc(80vh - 20vh);
  overflow-y: auto;
  overscroll-behavior: contain;
  z-index: 100000;`;

export {
  StarView, StyledButton, ModalWrapper, Modal, ModalContent,
};
