/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AnswerForm from './AnswerForm.jsx';

describe('AnswerForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    render(<AnswerForm productName="Eric" questionBody="Why is Eric?" onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders product name and question body', () => {
    expect(screen.getByText('Eric: Why is Eric?')).toBeTruthy();
  });

  it('display error message when invalid email is entered', () => {
    const answerInput = screen.getByPlaceholderText('Please add a written answer');
    const nicknameInput = screen.getByPlaceholderText('Example: jackson11!');
    const emailInput = screen.getByPlaceholderText('Example: jackson11@email.com');

    fireEvent.change(answerInput, { target: { value: 'aaa' } });
    fireEvent.change(nicknameInput, { target: { value: 'bbb' } });
    fireEvent.change(emailInput, { target: { value: 'ccc' } });

    const submitButton = screen.getByText('SUBMIT ANSWER');
    fireEvent.click(submitButton);
    expect(screen.getByText('Please enter a valid email address.')).toBeTruthy();
  });

  it('submit when valid data is entered', () => {
    const answerInput = screen.getByPlaceholderText('Please add a written answer');
    const nicknameInput = screen.getByPlaceholderText('Example: jackson11!');
    const emailInput = screen.getByPlaceholderText('Example: jackson11@email.com');

    fireEvent.change(answerInput, { target: { value: 'Eric' } });
    fireEvent.change(nicknameInput, { target: { value: 'Eric' } });
    fireEvent.change(emailInput, { target: { value: 'Eric@gmail.com' } });

    const submitButton = screen.getByText('SUBMIT ANSWER');
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('calls onCance when cancel button is clicked', () => {
    const cancelButton = screen.getByText('CANCEL');
    fireEvent.click(cancelButton);
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('displays error message when invalid image url is entered', () => {
    const imageInput = screen.getByPlaceholderText('Enter the direct link to your image');
    const addButton = screen.getByText('Add URL');
    fireEvent.change(imageInput, { target: { value: 'aaaabbbbcccc' } });
    fireEvent.click(addButton);
    expect(screen.getByText('Please enter a valid image url address.')).toBeTruthy();
  });

  it('displays thumbnail images correctly', () => {
    const mockImageUrl = 'https://eric.com/image.jpg';
    const imageInput = screen.getByPlaceholderText('Enter the direct link to your image');
    const addButton = screen.getByText('Add URL');

    fireEvent.change(imageInput, { target: { value: mockImageUrl } });
    fireEvent.click(addButton);

    const thumbnailImg = screen.getByAltText('Image-0');
    expect(thumbnailImg).toBeTruthy();
    expect(thumbnailImg.src).toBe(mockImageUrl);
  });

  it('displays an error if there are more than 5 images', () => {
    const imageInput = screen.getByPlaceholderText('Enter the direct link to your image');
    const addButton = screen.getByText('Add URL');

    for (let i = 0; i < 5; i += 1) {
      fireEvent.change(imageInput, { target: { value: `https://eric.com/image${i}.jpg` } });
      fireEvent.click(addButton);
    }

    fireEvent.change(imageInput, { target: { value: 'https://eric.com/image6.jpg' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Please enter a valid email address.')).toBeTruthy();
  });
});
