/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar.jsx';

describe('<QuestionsAndAnswers />', () => {
  it('filter questions based on search input', () => {
    const mockSearch = jest.fn();
    const { getByPlaceholderText } = render(<SearchBar onSearch={mockSearch} />);
    const searchInput = getByPlaceholderText('HAVE A QUESTION? SEARCH FOR ANSWERS...');
    // Fire an input event on the search bar less than 3 characters
    fireEvent.change(searchInput, { target: { value: 'NO' } });
    expect(mockSearch).toHaveBeenCalledWith('');
    // // Fire an input event on the search bar more than 3 characters
    fireEvent.change(searchInput, { target: { value: 'YES' } });
    expect(mockSearch).toHaveBeenCalledWith('YES');
  });
});
