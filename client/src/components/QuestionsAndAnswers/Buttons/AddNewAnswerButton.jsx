import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Forms/Modal.jsx';
import AnswerForm from '../Forms/AnswerForm.jsx';
import { AnswerThisQuestionButton } from '../styled-components/Buttons.styles.jsx';
import { YesAndReportButton, YesReportSpan } from '../../../styled-components/YesAndReportButton.styles.jsx';
import ThemeContext from '../../ThemeContext.jsx';

function AddNewAnswerButton({productName, questionBody, length, onHandleAddAnswer }) {
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

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
    onHandleAddAnswer(formData);
    console.log(formData);
    // close the modal after submit
    setIsOpen(false);
  };

  return (
    <div>
      {length === 0
        ? (
          <AnswerThisQuestionButton type="button" onClick={handleOpenModal} $theme={theme}>
            Answer This Question
          </AnswerThisQuestionButton>
        )
        : (
          <YesAndReportButton type="button" onClick={handleOpenModal} $theme={theme}>
            <YesReportSpan>Add Answer</YesReportSpan>
          </YesAndReportButton>
        )}
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <AnswerForm
          productName={productName}
          questionBody={questionBody}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}
AddNewAnswerButton.propTypes = {
  productName: PropTypes.string.isRequired,
  questionBody: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  onHandleAddAnswer: PropTypes.func.isRequired,
};

export default AddNewAnswerButton;
