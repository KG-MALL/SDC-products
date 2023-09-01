import styled, { keyframes, css } from 'styled-components';
import searchIcon from '../../../../dist/assets/searchIcon.svg';
import questionIcon from '../../../../dist/assets/questionIcon1.svg';
import profileIcon from '../../../../dist/assets/profileIcon.svg';
import dateIcon from '../../../../dist/assets/dateIcon.svg';
import reportIcon from '../../../../dist/assets/reportIcon.svg';

export const QAContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 100vh;
  border-bottom: var(--common-border-width,1px) solid ${({ $theme }) => ($theme === 'light' ? 'rgba(0,0,0,0.15)' : '#dfdfdf')};
  padding: 20px 0;
`;

export const QuestionList = styled.ul`
  list-style-type: none;
  max-height: 80vh;
  padding-left: 0;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const QuestionDetailsList = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  flex-shrink: 0;
  width: 100%;
  border-radius: 8px;
  &:not(:first-child) {
    border-top: var(--common-border-width,1px) solid ${({ $theme }) => ($theme === 'light' ? 'rgba(0,0,0,0.15)' : '#dfdfdf')};
  }
  padding: 10px 0;

`;

export const AskerDetailsContainer = styled.div`
  min-width: 200px;
  max-width: 200px;
  border-right: var(--common-border-width,1px) solid ${({ $theme }) => ($theme === 'light' ? 'rgba(0,0,0,0.15)' : '#dfdfdf')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 30px;
  padding-bottom: 20px;
  font-size: 16px;
  p {
    margin: 5px 0;
    line-height: 1.7;
  }
`;
export const QuestionAndAnswersContainer = styled.div`
  flex: 2;
  padding-left: 20px;
`;

export const QuestionBodyAndHelpfulContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const AnswerListContainer = styled.ul`
  list-style-type: none;
  padding-left: 0;
  max-height: 50vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;


export const SearchBarContainer = styled.div`
  width: 65%;
  padding: 20px;
  position: sticky;
  // makes it stick on top of the scrollable section
  top: 0;
  background-color: transparent;
  padding-bottom: 0;
  text-align: center;
  margin: 0 auto;
`;

export const SearchInput = styled.input`
  width: 50%;
  margin: 0 auto;
  text-align: left;
  padding: 10px;
  padding-left: 30px;
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: left 10px center;
  border-radius: 10px;
`;

export const YesReportButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const AnswerDetailsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
export const LoadMoreAndAddNewButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

export const BodyAndQuestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0;
`;
export const QuestionAskedByText = styled.p`
  font-size: 14px;
  font-style: italic;
`;
const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
export const ScrollSpinner = styled.div`
  border: 16px solid whitesmoke;
  border-top: 16px solid dodgerblue;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  animation: ${spinAnimation} 2s linear infinite;
  // make it center
  margin: 20px auto;
`;
export const Header = styled.h2`
  border-top: 0;
  margin-bottom: 10px;
`;

export const ThumbnailImg = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 25%;
  border: 2px solid #E0E0E0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

export const HighlightTerm = styled.span`
  background-color: yellow;
`;
export const AnswerBodyText = styled.p`
  font-family: AktivGrotesk-Light, Helvetica, sans-serif;
  max-width: 50%;
  font-size: 14px;
  color: ${({ $theme }) => ($theme === 'light' ? '#222222' : '#DFDFDF')}
  text-align: left;
  overflow-wrap: break-word;
  clear: both;
  margin-left: 5px;
  margin-top: 0;
`;

export const AnswerContainer = styled.div`
  display: flex;
  align-Items: baseline;
`;

export const NoQuestionImage = styled.img`
  width: 30%;
  max-width: 400px;
  display: block;
  margin: 20px auto;
  filter: ${({ $theme }) => ($theme === 'light' ? 'invert(0%)' : 'invert(100%)')};
`;

export const ImageAndButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  `;

export const ScrollableContainer = styled.div`
  max-height: 100vh;
  overflow-y: auto;
  position: relative;
`;
export const QuestionIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${questionIcon});
  background-repeat: no-repeat;
  background-size: contain;
  filter: ${({ $theme }) => ($theme === 'light' ? 'invert(0%)' : 'invert(100%)')};
  margin-right: 5px;
  align-self: center;
`;
export const ProfileIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${profileIcon});
  background-repeat: no-repeat;
  background-size: contain;
  filter: ${({ $theme }) => ($theme === 'light' ? 'invert(0%)' : 'invert(100%)')};
  margin-right: 5px;
  align-self: center;
`;
export const DateIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${dateIcon});
  background-repeat: no-repeat;
  background-size: contain;
  filter: ${({ $theme }) => ($theme === 'light' ? 'invert(0%)' : 'invert(100%)')};
  margin-right: 5px;
  align-self: center;
`;
export const ReportIcon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${reportIcon});
  background-repeat: no-repeat;
  background-size: contain;
  filter: ${({ $theme }) => ($theme === 'light' ? 'invert(0%)' : 'invert(100%)')};
  margin-right: 5px;
  align-self: center;
`;

export const QuestionIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  word-wrap: break-word;
`;

export const AnswerFormContainer = styled.div`
  color: ${({ $theme }) => ($theme === 'light' ? '#222222' : '#DFDFDF')};
  line-height: 1.4;
`;
export const NoQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
