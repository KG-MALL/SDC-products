/** @jest-environment jsdom */
/* eslint-env jest */
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import NewReview from './NewReview.jsx';

describe('NewReview Component', () => {
  const renderForm = jest.fn();
  const currentProductID = 40434;
  const submitForm = jest.fn();
  const characteristics = { Length: 3, Comfort: 3 };

  test('NewReview Component rendered', () => {
    render(<NewReview
      renderForm={renderForm}
      currentProductID={currentProductID}
      submitForm={submitForm}
      characteristics={characteristics}
    />);
    expect(screen.getByTestId('newReviewForm')).toBeTruthy();
  });

  // test('handleChange changes values based on user input', () => {
  //   render(<NewReview
  //     renderForm={renderForm}
  //     currentProductID={currentProductID}
  //     submitForm={submitForm}
  //     characteristics={characteristics}
  //   />);
  //   const summary = screen.getByLabelText('Review Summary:');
  //   fireEvent.change(summary, { target: { value: 'exampleSummary' } });
  //   expect(summary.value).toBe('exampleSummary');
  // });
});
