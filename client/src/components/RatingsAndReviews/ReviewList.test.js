/** @jest-environment jsdom */
/* eslint-env jest */
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ReviewList from './ReviewList.jsx';
import data from './exampleData.json';

describe('ReviewList Component', () => {
  const reviews = data.results;
  const mockFilters = ['3'];
  const mockSubmitMessage = false;
  const mockChangeSortMethod = jest.fn();

  test('Component rendered', () => {
    render(<ReviewList
      reviews={reviews}
      filters={mockFilters}
      submitMessage={mockSubmitMessage}
      changeSortMethod={mockChangeSortMethod}
    />);
    const title = screen.getByTestId('reviewList-component');
    expect(title).toBeTruthy();
  });
  test('Modal rendered', () => {
    render(<ReviewList
      reviews={reviews}
      filters={mockFilters}
      submitMessage={mockSubmitMessage}
      hangeSortMethod={mockChangeSortMethod}
    />);
    const button = screen.getByTestId('reviewList-button');
    fireEvent.click(button);
    fireEvent.click(button);
    const modal = screen.getByTestId('reviewList-modal');
    expect(modal).toBeTruthy();
  });
});
