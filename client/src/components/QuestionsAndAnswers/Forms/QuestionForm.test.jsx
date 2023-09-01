/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import QuestionForm from './QuestionForm.jsx';

describe('QuestionForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    render(<QuestionForm productName="Eric" onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders product name correctly', () => {
    expect(screen.getByText('About the Eric')).toBeTruthy();
  });
  it('display error message when invalid email is entered', () => {
    const questionInput = screen.getByPlaceholderText('Why did you like the product or not?');
    const nicknameInput = screen.getByPlaceholderText('Example: jackson11!');
    const emailInput = screen.getByPlaceholderText('Example: jackson11@email.com');

    fireEvent.change(questionInput, { target: { value: 'Eric.' } });
    fireEvent.change(nicknameInput, { target: { value: 'Eric' } });
    fireEvent.change(emailInput, { target: { value: 'EricIsWrong' } });
    const submitButton = screen.getByText('SUBMIT QUESTION');
    fireEvent.click(submitButton);
    expect(screen.getByText('Please enter a valid email address.')).toBeTruthy();
  });
  it('submit when valid data is entered', () => {
    const questionInput = screen.getByPlaceholderText('Why did you like the product or not?');
    const nicknameInput = screen.getByPlaceholderText('Example: jackson11!');
    const emailInput = screen.getByPlaceholderText('Example: jackson11@email.com');

    fireEvent.change(questionInput, { target: { value: 'eric' } });
    fireEvent.change(nicknameInput, { target: { value: 'eric' } });
    fireEvent.change(emailInput, { target: { value: 'eric@email.com' } });

    const submitButton = screen.getByText('SUBMIT QUESTION');
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});