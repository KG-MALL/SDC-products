/** @jest-environment jsdom */
/* eslint-env jest */
import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import RatingsAndReviews from './RatingsAndReviews.jsx';

describe('Ratings Component', () => {
  const mockCurrentProductID = 40344;
  const mockMetaData = {
    characteristics: {
      Fit: {}, Length: {}, Comfort: {}, Quality: {},
    },
    product_id: 40344,
    ratings: {
      1: '151', 2: '214', 3: '330', 4: '327', 5: '715',
    },
    recommended: { false: '446', true: '1291' },
  };
  test('RatingsAndReviews Component rendered', () => {
    render(<RatingsAndReviews currentProductID={mockCurrentProductID} metaData={mockMetaData} />);
    expect(screen.getByTestId('title')).toBeTruthy();
  });

  test('NewReview Component not rendered', () => {
    render(<RatingsAndReviews currentProductID={mockCurrentProductID} metaData={mockMetaData} />);
    expect(screen.queryByTestId('newReviewForm')).toBeNull();
  });

  test('NewReview Component rendered after button click', () => {
    render(<RatingsAndReviews currentProductID={mockCurrentProductID} metaData={mockMetaData} />);
    const button = screen.getByTestId('newReviewBtn');
    fireEvent.click(button);
    expect(screen.queryByTestId('newReviewForm')).toBeTruthy();
  });

  test('NewReview Component hidden after two button clicks', () => {
    render(<RatingsAndReviews currentProductID={mockCurrentProductID} metaData={mockMetaData} />);
    const button = screen.getByTestId('newReviewBtn');
    fireEvent.click(button);
    const closeButton = screen.getByTestId('closeModal');
    fireEvent.click(closeButton);
    expect(screen.queryByTestId('newReviewForm')).toBeNull();
  });
});
