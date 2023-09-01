import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculatePercentage } from './arithmetic.js';
import ThemeContext from '../ThemeContext.jsx';

function RatingsGraph({ metaData, changeFilter }) {
  const { theme } = useContext(ThemeContext);
  const starArray = [5, 4, 3, 2, 1];
  return (
    <div data-testid="ratings-graph-component">
      {starArray.map((rating) => (
        <BarFormat
          key={rating}
        >
          <StarSpan
            id={rating}
            onClick={(e) => changeFilter(e.target.id)}
            data-testid="span"
          >
            {`${rating} stars`}
          </StarSpan>
          <BarDisplay
            id={rating}
            $metadata={metaData}
            $rating={rating}
            $theme={theme}
            onClick={(e) => changeFilter(e.target.id)}
          />
          <ReviewSpan
            id={rating}
            $theme={theme}
            onClick={(e) => changeFilter(e.target.id)}
          >
            {`(${metaData[rating]})`}
          </ReviewSpan>
        </BarFormat>
      ))}
    </div>
  );
}

RatingsGraph.propTypes = {
  // eslint-disable-next-line react/require-default-props
  metaData: PropTypes.objectOf(PropTypes.string),
  changeFilter: PropTypes.func.isRequired,
};

export default RatingsGraph;

const BarFormat = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }`;

const StarSpan = styled.span`
  padding-right: 10px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }`;

const BarDisplay = styled.div`
  background: linear-gradient(90deg,
    ${({ $theme }) => ($theme === 'light' ? 'black' : 'white')} ${({ $metadata, $rating }) => calculatePercentage($metadata, $rating)}%,
    ${({ $theme }) => ($theme === 'light' ? 'lightgray' : 'rgb(121, 121, 121)')} ${({ $metadata, $rating }) => calculatePercentage($metadata, $rating)}%);
  height: 10px;
  width: 200px;
  &:hover {
    box-shadow: 0px 5px 10px 0px rgba${({ $theme }) => ($theme === 'light' ? '(0, 0, 0, 0.5)' : '(255, 255, 255, 0.5)')};
    cursor: pointer;
  }`;

const ReviewSpan = styled.span`
  padding-left: 10px;
  font-size: 10px;
  text-decoration: underline;
  &:hover {
    color: ${({ $theme }) => ($theme === 'light' ? '#5a5a5a' : '#ADD8E6')};
    text-decoration: none;
  }`;
