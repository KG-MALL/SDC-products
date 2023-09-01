/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddNewQuestionButton from './AddNewQuestionButton.jsx';

describe('AddNewQuestionButton', () => {
  const mockOnHandleAddQuestion = jest.fn();
  beforeEach(() => {
    render(<AddNewQuestionButton productName="Eric" onHandleAddQuestion={mockOnHandleAddQuestion} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should open modal button is clicked', () => {
    const addButton = screen.getByText('ADD A QUESTION');
    fireEvent.click(addButton);

    const text = screen.getByText('Ask Your Question');
    expect(text).toBeTruthy();
  });

  it('should close the modal when cancel button is clicked', () => {
    const button = screen.getByText('ADD A QUESTION');
    fireEvent.click(button);

    const cancelButton = screen.getByText('CANCEL');
    fireEvent.click(cancelButton);
    expect(screen.queryByText('Ask Your Question')).toBeNull();
  });
});
