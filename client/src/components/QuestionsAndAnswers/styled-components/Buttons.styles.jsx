/*
 * RoundedPulseButton styles inspired by or adapted from work by Raj Kamal.
 * All rights reserved by the original author.
 * This adaptation or usage does not imply any affiliation
 * with or endorsement by the original creator.
 */
import styled, { keyframes, css } from 'styled-components';

const moveInBottom = keyframes`
    0% {
        opacity: 0;
        transform: translateY(30px);
    }

    100% {
        opacity: 1;
        transform: translateY(0px);
    }
`;

export const RoundedPulseButton = styled.button`
    text-decoration: none;
    padding: 15px 40px;
    display: inline-block;
    border-radius: 100px;
    transition: all .2s;
    position: relative;
    background-color: #fff;
    color: #777;
    animation: ${moveInBottom} 5s ease-out;
    animation-fill-mode: backwards;
    cursor: pointer;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: translateY(-1px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

    &::after {
        content: "";
        display: inline-block;
        height: 100%;
        width: 100%;
        border-radius: 100px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        transition: all .4s;
        background-color: #fff;
    }

    &:hover::after {
        transform: scaleX(1.4) scaleY(1.6);
        opacity: 0;
    }
`;

export const LoadMoreAnswerButton = styled.button`
  font-size: 12px;
  font-weight: 700;
  border: none;
  color: ${({ $theme }) => ($theme === 'light' ? '#003057' : '#ADD8E6')};
  cursor: pointer;
  background: none;
  padding-left: 0;
  &:hover {
    text-decoration: underline;
  }
`;

export const AnswerThisQuestionButton = styled.button`
  text-decoration: none;
  border: none;
  color: ${({ $theme }) => ($theme === 'light' ? '#007185' : '#ADD8E6')};
  background: none;
  cursor: pointer;
  padding-top: 10px;
  padding-left: 0;
  &:hover {
    text-decoration: underline;
  }
`;