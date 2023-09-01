import styled from 'styled-components';

export const YesAndReportButton = styled.button`
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  line-height: 2;
  color: ${({ $theme }) => ($theme === 'light' ? '#5a5a5a' : '#ADD8E6')}
`;
export const YesReportButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: ${({ $theme }) => ($theme === 'light' ? '#5a5a5a' : '#ADD8E6')}
`;
export const HelpfulTextSpan = styled.span`
  font-family: 'Helvetica', 'Arial', sans-serif;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-right: 5px;
`;

export const YesReportSpan = styled.span`
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
`;