/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react';
import { render, act } from '@testing-library/react';
import ReportButton from './ReportButton.jsx';

describe('ReportButton', () => {
  it('renders shows initial status', () => {
    const { getByText } = render(<ReportButton
      initialReported={false}
      onHelpfulClick={() => {}}
    />);
    const button = getByText('Report');
    expect(button).not.toBeNull();
  });
  it('toggle status when clicked', () => {
    const onReportClickMock = jest.fn();
    const { getByText } = render(<ReportButton
      initialReported={false}
      onReportClick={onReportClickMock}
    />);
    const button = getByText('Report');
    act(() => {
      button.click();
    });
    expect(getByText('Reported')).not.toBeNull();
    expect(onReportClickMock).toHaveBeenCalled();
  });
});