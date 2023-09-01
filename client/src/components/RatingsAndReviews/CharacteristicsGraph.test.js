/** @jest-environment jsdom */
/* eslint-env jest */
import { render, screen } from '@testing-library/react';
import React from 'react';
import descriptionArr from './descriptionArr.js';
import CharacteristicsGraph from './CharacteristicsGraph.jsx';

describe('Char Graph Component', () => {
  const mockMetaData = {
    Comfort: { id: 135221, value: '3.3343653250773994' },
    Fit: { id: 135219, value: '3.2572533849129594' },
    Length: { id: 135220, value: '3.2960396039603960' },
    Quality: { id: 135222, value: '3.2974619289340102' },
  };

  render(<CharacteristicsGraph metaData={mockMetaData} />);
  const title = screen.getByTestId('char-graph-component');

  test('Component rendered', () => {
    expect(title).toBeTruthy();
  });
});
