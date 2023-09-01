/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useHelpfulYes from '../../../utils/useHelpfulYes.jsx';
import useReport from '../../../utils/useReport.jsx';
import { reFormatDate } from '../../../utils/reFormatDate.js';
import HelpfulYesButton from '../../../utils/HelpfulYesButton.jsx';
import ReportButton from '../../../utils/ReportButton.jsx';
import { StarView } from '../../styled-components/common-elements.jsx';

function Review({ review, handleThumbnailClick }) {
  const registerHelpfulClick = useHelpfulYes();
  const registerReportClick = useReport();

  const {
    reported,
    response,
    review_id,
    body,
    date,
    helpfulness,
    photos,
    rating,
    recommend,
    reviewer_name,
    summary,
  } = review;

  // closing modal will set phototodisplay back to empty string
  return (
    <Component data-testid="review-component">
      <LeftColumn>
        <p>{`Name: ${reviewer_name}`}</p>
        <p><i>{recommend ? 'recommended' : ''}</i></p>
        <ReportButton
          initialReported={reported}
          onReportClick={() => registerReportClick('review', review_id)}
        />
      </LeftColumn>

      <MiddleColumn>
        <ReviewHeader>
          <StarView rating={rating} fontSize={20} />
          :
          <Summary>
            <strong>{summary}</strong>
          </Summary>
        </ReviewHeader>
        <div style={{ 'wordBreak': 'break-word' }}>
          <p>
            {body}
          </p>
        </div>
        {response && <p style={{ 'color': 'red' }}><strong>{response}</strong></p>}
      </MiddleColumn>

      <RightColumn>
        {/* eslint-disable-next-line react/no-array-index-key */}
        {!photos.length ? ''
          : photos.map((photo, index) => (
            <img
              key={photo.url + index}
              style={{ 'width': '50px', 'cursor': 'pointer' }}
              src={photo.url}
              alt="uploaded by reviewer"
              onClick={(e) => handleThumbnailClick(e.target.src)}
            />
          ))}
        <p>{reFormatDate(date)}</p>
        <div style={{ 'display': 'flex', 'flexDirection': 'column' }}>
          <HelpfulYesButton
            initialCount={helpfulness}
            onHelpfulClick={() => registerHelpfulClick('review', review_id)}
          />
        </div>
      </RightColumn>
    </Component>
  );
}

const Component = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid gray;
  min-height: 12.5rem;
  align-items: center`;

const LeftColumn = styled.div`
  border-right: 1px solid gray;
  padding-right: 1.25rem;
  width: 15%;`;

const MiddleColumn = styled.div`
  width: 50%;`;

const RightColumn = styled.div`
  border-left: 1px solid gray;
  padding-left: 1.25rem;
  width: 15%;
  text-align: center;`;

const Summary = styled.div`
  padding-left: .625rem;
  font-size: 1em;
  word-break: break-word;`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content;`;

Review.propTypes = {
  review: PropTypes.shape({
    body: PropTypes.string,
    date: PropTypes.string,
    helpfulness: PropTypes.number,
    photos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
    })),
    rating: PropTypes.number,
    recommend: PropTypes.bool,
    review_id: PropTypes.number,
    response: PropTypes.string,
    reviewer_name: PropTypes.string,
    summary: PropTypes.string,
    reported: PropTypes.bool,
  }).isRequired,
};

export default Review;
