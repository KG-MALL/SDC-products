/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import { sortByHelpQuestion, sortByHelpAnswer } from './sortHelp.js';

describe('Utils functions', () => {
  describe('sortByHelpQuestion', () => {
    it('sorts questions based on helpfulness in descending order', () => {
      const questions = [
        { question_helpfulness: 55 },
        { question_helpfulness: 89 },
        { question_helpfulness: 20 },
        { question_helpfulness: 0 },
      ];

      const sorted = sortByHelpQuestion(questions);
      expect(sorted[0].question_helpfulness).toBe(89);
      expect(sorted[1].question_helpfulness).toBe(55);
      expect(sorted[2].question_helpfulness).toBe(20);
      expect(sorted[3].question_helpfulness).toBe(0);
    });
  });

  describe('sortByHelpAnswer', () => {
    it('prioritizes Seller and sorts questions based on helpfulness in descending order', () => {
      const answers = [
        { answerer_name: 'Eric', helpfulness: 5 },
        { answerer_name: 'Seller', helpfulness: 30 },
        { answerer_name: 'Eric', helpfulness: 18 },
        { answerer_name: 'Seller', helpfulness: 70 },
      ];

      const sorted = sortByHelpAnswer(answers);
      expect(sorted[0].answerer_name).toBe('Seller');
      expect(sorted[0].helpfulness).toBe(70);
      expect(sorted[1].answerer_name).toBe('Seller');
      expect(sorted[1].helpfulness).toBe(30);
      expect(sorted[2].helpfulness).toBe(18);
      expect(sorted[3].helpfulness).toBe(5);
    });
  });
});
