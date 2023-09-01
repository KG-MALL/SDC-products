import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { sortByHelpQuestion } from '../utils/sortHelp.js';
import Question from './Question.jsx';
import LoadMoreQuestionsButton from '../Buttons/LoadMoreQuestionsButton.jsx';
import AddNewQuestionButton from '../Buttons/AddNewQuestionButton.jsx';
import { QuestionList, LoadMoreAndAddNewButtonContainer, ScrollSpinner } from '../styled-components/QuestionsAndAnswers.styles.jsx';

function QuestionsList({ productName, questions, onHandleAddQuestion, searchTerm }) {
  const sortedQuestions = sortByHelpQuestion(questions);
  // On page load, 2 questions will show up
  const QuestionsLoadOnPage = 2;
  const [numQuestionsShowed, setNumQuestionShowed] = useState(QuestionsLoadOnPage);
  const [hasClickedLoadMore, setHasClickedLoadMore] = useState(false);
  const questionListRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // Infinite scroll
  const handleScroll = () => {
    if (questionListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = questionListRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        setIsLoading(true);
        setTimeout(() => {
          setNumQuestionShowed((prev) => prev + 2);
          setIsLoading(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (hasClickedLoadMore) {
      questionListRef.current.addEventListener('scroll', handleScroll);
      return () => {
        if (questionListRef.current) {
          questionListRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
    // Expected to return a value at the end of arrow function (Eslint)
    return () => {};
  }, [hasClickedLoadMore]);

  const handleShowMore = () => {
    setHasClickedLoadMore(true);
    setNumQuestionShowed((prev) => prev + 2);
  };


  return (
    <div>
      <QuestionList ref={questionListRef}>
        {sortedQuestions.slice(0, numQuestionsShowed).map((question) => (
          <Question
            key={question.question_id}
            productName={productName}
            question={question}
            searchTerm={searchTerm}
          />
        ))}
      </QuestionList>
      {isLoading && <ScrollSpinner />}
      <LoadMoreAndAddNewButtonContainer>
        {!hasClickedLoadMore && (
          <LoadMoreQuestionsButton
            onClick={handleShowMore}
            hasMoreQuestions={numQuestionsShowed < sortedQuestions.length}
          />
        )}
        <AddNewQuestionButton
          productName={productName}
          onHandleAddQuestion={onHandleAddQuestion}
        />
      </LoadMoreAndAddNewButtonContainer>
    </div>
  );
}

QuestionsList.propTypes = {
  onHandleAddQuestion: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    question_id: PropTypes.number,
  })).isRequired,
};

export default QuestionsList;