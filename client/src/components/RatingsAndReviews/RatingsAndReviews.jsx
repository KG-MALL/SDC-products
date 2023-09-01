import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styled from 'styled-components';
import {
  StarView, StyledButton, ModalWrapper, Modal, ModalContent,
} from '../../styled-components/common-elements.jsx';
import RatingsGraph from './RatingsGraph.jsx';
import ReviewList from './ReviewList.jsx';
import NewReview from './NewReview.jsx';
import { calculateAverage, calculateTotal, calculatePercentage } from './arithmetic.js';
import CharacteristicsGraph from './CharacteristicsGraph.jsx';
import ThemeContext from '../ThemeContext.jsx';

function RatingsAndReviews({ currentProductID, metaData }) {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState([]);
  const [submitMessage, setSubmitMessage] = useState(false);
  const [sortBy, setSortBy] = useState('relevant');
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    axios.get('/reviews', {
      params: {
        product_id: currentProductID,
        count: 100,
      },
    })
      .then((response) => {
        if (sortBy === 'relevant') {
          setReviews(response.data.results);
        } else if (sortBy === 'helpful') {
          setReviews(response.data.results.sort((a, b) => b.helpfulness - a.helpfulness));
        } else if (sortBy === 'newest') {
          setReviews(response.data.results.sort((a, b) => new Date(b.date) - new Date(a.date)));
        }
      })
      .catch((err) => { console.log(err); });
  }, [currentProductID, submitMessage, sortBy]);

  // eslint-disable-next-line func-names
  const renderForm = function () {
    setShowForm((prevView) => !prevView);
  };

  const changeFilter = (value) => {
    const index = filters.indexOf(value);
    if (index > -1) {
      setFilters((prevFilters) => [...prevFilters.slice(0, index), ...prevFilters.slice(index + 1)])
    } else {
      setFilters((prevFilters) => [...prevFilters, value]);
    }
  };

  const submitForm = (formObj) => {
    axios.post('/reviews', formObj)
      .then(() => setSubmitMessage((prev) => !prev))
      .catch((err) => {console.log(err)});
  };

  const changeSortMethod = function (value) {
    setSortBy(value);
  };

  return (
    <Component className="ratingsComponent" id="ratingsComponent" data-testid="testing">
      <h2 data-testid="title">Reviews</h2>
      <Container>
        {metaData && (
        <LeftColumn>
          <div>
            <RatingContainer>
              <Rating>{`${calculateAverage(metaData.ratings)} `}</Rating>
              <StarView rating={calculateAverage(metaData.ratings)} fontSize={20} />
            </RatingContainer>
            <NumOfReviews>
              <i>{`Based on ${calculateTotal(metaData.recommended)} reviews`}</i>
            </NumOfReviews>
            <RatingsGraph metaData={metaData.ratings} changeFilter={changeFilter} />
            <Recommended>{`${calculatePercentage(metaData.recommended, 'true')}% of users recommend this product`}</Recommended>
          </div>
        </LeftColumn>
        )}
        {metaData.characteristics && (
          <MiddleColumn>
            <CharacteristicsGraph metaData={metaData.characteristics} />
          </MiddleColumn>
        )}
        <RightColumn>
          <StyledButton
            $theme={theme}
            onClick={() => setShowForm((prev) => !prev)}
            data-testid="newReviewBtn"
            type="button"
            disabled={submitMessage}
          >
            Write Review
          </StyledButton>

        </RightColumn>
      </Container>
      {showForm
        &&
      (
        <ModalWrapper $displaymodal={showForm}>
          <Modal $theme={theme} $displaymodal={showForm}>
            <h3>Your Review</h3>
            <ModalContent $theme={theme} $displaymodal={showForm}>
              <NewReview
                renderForm={renderForm}
                submitForm={submitForm}
                currentProductID={currentProductID}
                characteristics={metaData.characteristics}
              />
            </ModalContent>
            <StyledButton
              $theme={theme}
              data-testid="closeModal"
              type="button"
              onClick={() => setShowForm((prev) => !prev)}
            >
              Close
            </StyledButton>
          </Modal>
        </ModalWrapper>
      )}
      <ReviewList
        reviews={reviews}
        currentProductID={currentProductID}
        metaData={metaData}
        filters={filters}
        submitMessage={submitMessage}
        changeSortMethod={changeSortMethod}
      />
    </Component>
  );
}

const Component = styled.div`
  padding: 2.5rem 0;`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gray;
  height: 15.625rem;`;

const LeftColumn = styled.div`
  width: 33%;`;

const MiddleColumn = styled.div`
  width: 33%;
  margin-top: -1.563em;`;

const RightColumn = styled.div`
  width: 33%;
  display: flex;
  justify-content: flex-end;`;

const RatingContainer = styled.div`
  display: flex;
  align-items: flex-start`;

const Rating = styled.span`
  font-size: 1.563em;
  padding-right: 0.625rem;`;

const NumOfReviews = styled.h3`
  margin-top: 0;
  font-weight: lighter`;

const Recommended = styled.h5`
  margin-top: 5px;`;

RatingsAndReviews.propTypes = {
  currentProductID: PropTypes.number.isRequired,
  // eslint-disable-next-line react/require-default-props
  metaData: PropTypes.oneOfType([PropTypes.shape({
    characteristics: PropTypes.shape({
      Fit: PropTypes.shape({}),
      Length: PropTypes.shape({}),
      Comfort: PropTypes.shape({}),
      Quality: PropTypes.shape({}),
      Size: PropTypes.shape({}),
      Width: PropTypes.shape({}),
    }),
    product_id: PropTypes.string,
    ratings: PropTypes.shape({
      1: PropTypes.string,
      2: PropTypes.string,
      3: PropTypes.string,
      4: PropTypes.string,
      5: PropTypes.string,
    }),
    recommended: PropTypes.shape({
      false: PropTypes.string,
      true: PropTypes.string,
    }),
  }), PropTypes.string]),
};

export default RatingsAndReviews;
