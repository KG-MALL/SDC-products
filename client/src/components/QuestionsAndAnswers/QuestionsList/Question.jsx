import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { reFormatDate } from '../../../../utils/reFormatDate.js';
import { sortByHelpAnswer } from '../utils/sortHelp.js';
import Answer from './Answer.jsx';
import LoadMoreAnswersButton from '../Buttons/LoadMoreAnswersButton.jsx';
import AddNewAnswerButton from '../Buttons/AddNewAnswerButton.jsx';
import {
  QuestionDetailsList, AskerDetailsContainer,
  QuestionAndAnswersContainer,
  QuestionBodyAndHelpfulContainer, AnswerListContainer,
  BodyAndQuestionContainer, QuestionAskedByText, QuestionIcon, QuestionIconContainer, ProfileIcon, DateIcon, ReportIcon,
} from '../styled-components/QuestionsAndAnswers.styles.jsx';
import { YesReportButtonContainer } from '../../../styled-components/YesAndReportButton.styles.jsx';
import HelpfulYesButton from '../../../../utils/HelpfulYesButton.jsx';
import useHelpfulYes from '../../../../utils/useHelpfulYes.jsx';
import ReportButton from '../../../../utils/ReportButton.jsx';
import useReport from '../../../../utils/useReport.jsx';
import getHighlightedSearchTerm from '../utils/getHighlightedSearchTerm.jsx';
import ThemeContext from '../../ThemeContext.jsx';

function Question({ productName, question, searchTerm }) {
  const { theme } = useContext(ThemeContext);
  const registerHelpfulClick = useHelpfulYes();
  const registerReportClick = useReport();
  // On pageload, 2 answers show up per questions
  const AnswersLoadOnPage = 2;
  const [numAnswersShowed, setNumAnswersShowed] = useState(AnswersLoadOnPage);
  const [answers, setAnswers] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const fetchAnswers = () => {
    axios.get(`/qa/questions/${question.question_id}/answers`, {
      params: {
        count: 10,
      },
    })
      .then((res) => {
        setAnswers(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAnswers();
  }, [question.question_id]);

  const handleLoadMore = () => {
    if (!expanded) {
      setNumAnswersShowed(answers.length);
    } else {
      setNumAnswersShowed(AnswersLoadOnPage);
    }
    setExpanded((prev) => !prev);
  };

  const handleAddNewAnswer = (answerFormData) => {
    axios.post(`/qa/questions/${question.question_id}/answers`, {
      body: answerFormData.body,
      name: answerFormData.nickname,
      email: answerFormData.email,
      photos: answerFormData.photos,
    })
      .then((res) => {
        console.log('New Answer added:', res.data);
        fetchAnswers();
      })
      .catch((err) => console.log('Error adding answer:', err));
  };
  return (
    <QuestionDetailsList $theme={theme}>
      <AskerDetailsContainer $theme={theme}>
        <QuestionIconContainer>
          <QuestionIcon $theme={theme} />
          <QuestionAskedByText $theme={theme}>Question asked by</QuestionAskedByText>
        </QuestionIconContainer>
        <QuestionIconContainer>
          <ProfileIcon $theme={theme} />
          <p>{question.asker_name}</p>
        </QuestionIconContainer>
        <QuestionIconContainer>
          <DateIcon $theme={theme} />
          <p>{reFormatDate(question.question_date)}</p>
        </QuestionIconContainer>
        <QuestionIconContainer>
          <ReportIcon $theme={theme} />
          <ReportButton
            initialReported={question.reported}
            onReportClick={() => registerReportClick('questions', question.question_id)}
          />
        </QuestionIconContainer>
      </AskerDetailsContainer>
      <QuestionAndAnswersContainer>
        <QuestionBodyAndHelpfulContainer>
          <BodyAndQuestionContainer>
            <div data-testid="question-body">
              <strong>
                Q: {getHighlightedSearchTerm(question.question_body, searchTerm)}
              </strong>
              {answers.length === 0
              && (
                <AddNewAnswerButton
                  productName={productName}
                  questionBody={question.question_body}
                  onHandleAddAnswer={handleAddNewAnswer}
                  length={answers.length}
                />
              )}
            </div>
          </BodyAndQuestionContainer>
          <YesReportButtonContainer>
            <HelpfulYesButton
              initialCount={question.question_helpfulness}
              onHelpfulClick={() => registerHelpfulClick('questions', question.question_id)}
            />
            {answers.length > 0
            && (
              <AddNewAnswerButton
                productName={productName}
                questionBody={question.question_body}
                onHandleAddAnswer={handleAddNewAnswer}
                length={answers.length}
              />
            )}
          </YesReportButtonContainer>
        </QuestionBodyAndHelpfulContainer>
        <AnswerListContainer>
          {sortByHelpAnswer(answers)
            .slice(0, numAnswersShowed).map((answer) => (
              <Answer key={answer.answer_id} answer={answer} />
            ))}
        </AnswerListContainer>
        {answers.length > 2 && (
          <LoadMoreAnswersButton
             onClick={handleLoadMore}
             expanded={expanded}
          />
        )}
      </QuestionAndAnswersContainer>
    </QuestionDetailsList>
  );
}

Question.propTypes = {
  question: PropTypes.shape({
    productName: PropTypes.string,
    asker_name: PropTypes.string.isRequired,
    question_id: PropTypes.number.isRequired,
    question_helpfulness: PropTypes.number,
    question_date: PropTypes.string.isRequired,
    question_body: PropTypes.string.isRequired,
    reported: PropTypes.bool,
    answers: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.number,
    })).isRequired,
  }).isRequired,
};

export default Question;