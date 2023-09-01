/** @jest-environment jsdom */
/* eslint-env jest */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { StarView } from './common-elements.jsx';

describe('Ratings Component', () => {
  render(<StarView rating={3} fontSize={10} />);
  const component = screen.getByTestId('starTest');

  test('Component rendered', () => {
    expect(component).toBeTruthy();
  });
});
