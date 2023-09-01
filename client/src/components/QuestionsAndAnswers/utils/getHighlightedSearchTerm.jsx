import React from 'react';
import { HighlightTerm } from '../styled-components/QuestionsAndAnswers.styles.jsx';

const getHighlightedSearchTerm = (text, highlight) => {
  // Create a new regular expression pattern capturin the hightlight search term
  const textParts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return textParts.map((term, i) => (
    term.toLowerCase() === highlight.toLowerCase()
      ? <HighlightTerm key={i}>{term}</HighlightTerm>
      : term
  ));
};

export default getHighlightedSearchTerm;
