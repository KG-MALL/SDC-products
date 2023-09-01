/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react';
import { render, act } from '@testing-library/react';
import axios from 'axios';
import useReport from './useReport.jsx';

jest.mock('axios');
describe('useReport', () =>  {
  it('should call the correct endpoint for questions type', async () => {
    axios.put.mockResolvedValue({ status: 204 });
    // This utility function helps to use hook outside of a component.
    function Test() {
      const registerReportClick = useReport();
      act(() => {
        registerReportClick('questions', 1);
      });
      return null;
    }
    render(<Test />);
    expect(axios.put).toHaveBeenCalledWith('/qa/questions/1/report');
  });
  it('should call the correct endpoint for answers type', async () => {
    axios.put.mockResolvedValue({ status: 204 });
    // This utility function helps to use hook outside of a component.
    function Test() {
      const registerReportClick = useReport();
      act(() => {
        registerReportClick('answers', 2);
      });
      return null;
    }
    render(<Test />);
    expect(axios.put).toHaveBeenCalledWith('/qa/answers/2/report');
  });
  it('should call the correct endpoint for reviews type', async () => {
    axios.put.mockResolvedValue({ status: 204 });
    // This utility function helps to use hook outside of a component.
    function Test() {
      const registerReportClick = useReport();
      act(() => {
        registerReportClick('review', 3);
      });
      return null;
    }
    render(<Test />);
    expect(axios.put).toHaveBeenCalledWith('/reviews/3/report');
  });
});
