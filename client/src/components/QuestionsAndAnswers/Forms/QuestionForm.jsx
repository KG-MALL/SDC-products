import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputLabel, TextInput, ModalButtonContainer, LargerTextarea, HighlightedH4 } from '../styled-components/Modal.styles.jsx';
import { RoundedPulseButton } from '../styled-components/Buttons.styles.jsx';

function QuestionForm({ productName, onSubmit, onCancel }) {
  const [question, setQuestion] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmit = () => {
    if (!question || !nickname || !email) {
      setErrorMessage('Please fill out all mandatory fields.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    onSubmit({ question, nickname, email });
  };
  return (
    <div>
      {/* if errormessage is true show it */}
      {errorMessage && <div>{errorMessage}</div>}
      <h2>Ask Your Question</h2>
      <HighlightedH4>
        About the
        {' '}
        {productName}
      </HighlightedH4>
      <InputLabel>
        Your Question (mandatory)
        <LargerTextarea
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={1000}
          placeholder="Example: Why did you like the product or not?"
        />
        <span>
          {question.length}
          /1000 characters used
        </span>
      </InputLabel>
      <InputLabel>
        What is your nickname (mandatory)
        <TextInput
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={60}
          placeholder="Example: jackson11!"
        />
        <span>
          {nickname.length}
          /60 characters used
        </span>
      </InputLabel>
      <InputLabel>
        <div>For privacy reasons, do not use your full name or email address</div>
        Your email (mandatory)
        <TextInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={60}
          placeholder="Example: jackson11@email.com"
        />
        <span>
          {email.length}
          /60 characters used
        </span>
      </InputLabel>
      <div>For authentication reasons, you will not be emailed</div>
      <ModalButtonContainer>
        <RoundedPulseButton type="button" onClick={handleSubmit}>Submit Question</RoundedPulseButton>
        <RoundedPulseButton type="button" onClick={onCancel}>Cancel</RoundedPulseButton>
      </ModalButtonContainer>
    </div>
  );
};
QuestionForm.propTypes = {
  productName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default QuestionForm;
