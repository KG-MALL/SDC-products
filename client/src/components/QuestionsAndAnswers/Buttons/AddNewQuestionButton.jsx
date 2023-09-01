import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Forms/Modal.jsx';
import QuestionForm from '../Forms/QuestionForm.jsx';
import { RoundedPulseButton } from '../styled-components/Buttons.styles.jsx';
import { StyledButton } from '../../../styled-components/common-elements.jsx';
import ThemeContext from '../../ThemeContext.jsx';

function AddNewQuestionButton({ productName, onHandleAddQuestion }) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }
  }, [isOpen]);

  const handleSubmit = (formData) => {
    onHandleAddQuestion(formData);
    console.log(formData);
    // close the modal after submit
    setIsOpen(false);
  };
  return (
    <div>
      <StyledButton type="button" onClick={handleOpenModal} $theme={theme}>
        Add A Question
      </StyledButton>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <QuestionForm
          productName={productName}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

AddNewQuestionButton.propTypes = {
  onHandleAddQuestion: PropTypes.func,
  productName: PropTypes.string,
};
AddNewQuestionButton.defaultProps = {
  onHandleAddQuestion: () => {},
  productName: 'Default',
};

export default AddNewQuestionButton;