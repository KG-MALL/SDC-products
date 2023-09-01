import React from 'react';
import PropTypes from 'prop-types';
import { ImageModalContainer, ModalImage, CloseButton } from '../styled-components/Modal.styles.jsx';

function ImageModal({ imageUrl, onClose }) {
  return (
    <ImageModalContainer>
      <ModalImage src={imageUrl} alt="Thumbnail" />
      <CloseButton onClick={onClose}>X</CloseButton>
    </ImageModalContainer>
  );
}

ImageModal.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
