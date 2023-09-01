import React from 'react';
import PropTypes from 'prop-types';
import { SearchBarContainer, SearchInput, Header } from '../styled-components/QuestionsAndAnswers.styles.jsx';

function SearchBar({ onSearch }) {
  const SEARCH_FILTER_START_NUM = 3;
  const handleChange = (e) => {
    const { value } = e.target;
    // 3 or more
    if (value.length >= SEARCH_FILTER_START_NUM) {
      onSearch(value);
    } else {
      onSearch('');
    }
  };

  return (
    <SearchBarContainer>
      <Header>Customer Questions & Answers</Header>
      <SearchInput
        type="text"
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
        onChange={handleChange}
        aria-label="Search"
      />
    </SearchBarContainer>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
export default SearchBar;
