/** @jest-environment jsdom */
/* eslint-env jest */
import { render, screen } from '@testing-library/react';
import React from 'react';
import Review from './Review.jsx';
import data from './exampleData.json';

describe('Review Component', () => {
  const review = data.results[0];
  render(<Review review={review} />);
  const title = screen.getByTestId('review-component');

  test('Component rendered', () => {
    render(<Review review={review} />);
    expect(title).toBeTruthy();
  });
});
