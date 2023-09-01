export function sortByHelpQuestion(questions) {
  return questions.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
}

export function sortByHelpAnswer(answers) {
  const sortedAnswers = answers.sort((a, b) => {
    if (a.answerer_name === 'Seller') return -1;
    if (b.answerer_name === 'Seller') return 1;
    return b.helpfulness - a.helpfulness;
  });
  return sortedAnswers;
}
