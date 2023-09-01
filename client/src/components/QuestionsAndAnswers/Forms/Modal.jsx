import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalContainer, CloseButton } from '../styled-components/Modal.styles.jsx';
import ThemeContext from '../../ThemeContext.jsx';

function Modal({ isOpen, onClose, children }) {
  const { theme } = useContext(ThemeContext);
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer $theme={theme}>
        {/* children prop */}
        { children }
        <CloseButton onClick={onClose}>X</CloseButton>
      </ModalContainer>
    </Overlay>
  );
}
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default Modal;
