/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react';
import { render, act } from '@testing-library/react';
import axios from 'axios';
import useHelpfulYes from './useHelpfulYes.jsx';

jest.mock('axios');
describe('useHelpfulYes', () => {
  it('should call the correct endpoint for questions type', async () => {
    axios.put.mockResolvedValue({ status: 204 });

    // This utility function helps to use hook outside of a component.
    function Test() {
      const registerHelpfulClick = useHelpfulYes();
      act(() => {
        registerHelpfulClick('questions', 1);
      });
      return null;
    }
    render(<Test />);
    expect(axios.put).toHaveBeenCalledWith('/qa/questions/1/helpful');
  });
  it('should call the correct endpoint for answers type', async () => {
    axios.put.mockResolvedValue({ status: 204 });

    function Test() {
      const registerHelpfulClick = useHelpfulYes();
      act(() => {
        registerHelpfulClick('answers', 2);
      });
      return null;
    }

    render(<Test />);
    expect(axios.put).toHaveBeenCalledWith('/qa/answers/2/helpful');
  });

  it('should call the correct endpoint for review type', async () => {
    axios.put.mockResolvedValue({ status: 204 });

    function Test() {
      const registerHelpfulClick = useHelpfulYes();
      act(() => {
        registerHelpfulClick('review', 3);
      });
      return null;
    }

    render(<Test />);
    expect(axios.put).toHaveBeenCalledWith('/reviews/3/helpful');
  });
  it('should throw an error for wrong type', async () => {
    const registerHelpfulClick = useHelpfulYes();

    await expect(() => registerHelpfulClick('wrong', 123)).toThrow('Wrong type!');
  });
});
