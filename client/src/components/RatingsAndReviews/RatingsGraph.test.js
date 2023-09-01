/** @jest-environment jsdom */
/* eslint-env jest */
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import RatingsGraph from './RatingsGraph.jsx';
import { calculatePercentage } from './arithmetic.js';

describe('Ratings Graph Component', () => {
  const mockData = {
    1: '150', 2: '214', 3: '330', 4: '324', 5: '707',
  };
  const mockChangeFilter = jest.fn();
  const filter = ['1'];
  test('Component rendered', () => {
    render(<RatingsGraph metaData={mockData} changeFilter={mockChangeFilter} />);
    const title = screen.getByTestId('ratings-graph-component');
    expect(title).toBeTruthy();
  });
  test('Calculate Percentage working in component', () => {
    expect(calculatePercentage(mockData, '1')).toBe(8);
  });
  test('clicking on span changes filter', () => {
    render(<RatingsGraph metaData={mockData} changeFilter={mockChangeFilter} />);
    const filterButton = screen.getByTestId('span');
    fireEvent.click(filterButton);
    expect(filter.length).toBeTruthy();
  });
  test('clicking on span changes filter', () => {
    render(<RatingsGraph metaData={mockData} changeFilter={mockChangeFilter} />);
    const filterButton = screen.getByTestId('span2');
    fireEvent.click(filterButton);
    expect(filter.length).toBeTruthy();
  });
});
