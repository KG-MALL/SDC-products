/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react';
import { render } from '@testing-library/react';
import LoadMoreAnswersButton from './LoadMoreAnswersButton.jsx';

describe('<LoadMoreAnswersButton />', () => {
  it('renders the button when hasMoreAnswers is truthy', () => {
    const { getByText } = render(
      <LoadMoreAnswersButton onClick={() => {}} hasMoreAnswers />,
    );

    expect(getByText('See more answers')).toBeTruthy();
  });
});
