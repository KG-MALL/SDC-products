/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import QuestionsList from './QuestionsList';


jest.mock('./Question', () => () => <div>Mocked Question</div>);

describe('<QuestionsList />', () => {
  const mockQuestions = [
    { question_id: 1 },
    { question_id: 2 },
    { question_id: 3 },
    { question_id: 4 },
  ];

  it('renders the expected number of Questions', async () => {
    const { findAllByText } = render(<QuestionsList questions={mockQuestions.slice(0, 2)} />);
    const questions = await findAllByText('Mocked Question');
    expect(questions).toHaveLength(2);
  });

  it('renders correctly when there questions', () => {
    const { queryByText } = render(<QuestionsList questions={[]} />);
    const noQuestionsFound = queryByText('Mocked Question');
    expect(noQuestionsFound).toBeNull();
  });

  it('shows more questions when Load More Questions button is clicked', async () => {
    const { getByText, findAllByText } = render(<QuestionsList questions={mockQuestions} />);

    const loadMoreButton = getByText('MORE ANSWERED QUESTIONS');
    fireEvent.click(loadMoreButton);

    const questionsClicked = await findAllByText('Mocked Question');
    expect(questionsClicked).toHaveLength(4);
  });
});
