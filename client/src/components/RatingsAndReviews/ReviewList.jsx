import React, {useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Review from './Review.jsx';
import {
  StyledButton, ModalWrapper, Modal, ModalContent,
} from '../../styled-components/common-elements.jsx';
import ThemeContext from '../ThemeContext.jsx';

function ReviewList({ reviews, filters, submitMessage, changeSortMethod }) {
  const [reviewsToRender, setReviewsToRender] = useState([]);
  const [hiddenReviews, setHiddenReviews] = useState(0);
  const [displayedReviews, setDisplayedReviews] = useState(2);
  const [displayButton, setDisplayButton] = useState(true);
  const [displayedImage, setDisplayedImage] = useState('');
  const { theme } = useContext(ThemeContext);

  useEffect(() => setReviewsToRender(reviews), [reviews]);
  // eslint-disable-next-line func-names
  const handleClick = function () {
    if (displayedReviews === 4 && hiddenReviews > 1) {
      setDisplayButton(false);
      setDisplayedReviews(reviews.length);
    } else {
      setDisplayedReviews((prev) => prev + 2);
      setHiddenReviews((prev) => prev - 2);
    }
  };

  useEffect(() => {
    if (hiddenReviews <= 0) {
      setDisplayButton(false);
    } else {
      setDisplayButton(true);
    }
  }, [hiddenReviews]);

  useEffect(() => {
    if (displayedImage) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }
  }, [displayedImage]);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (filters.length === 0) {
      setReviewsToRender(reviews);
    } else {
      setReviewsToRender(reviews.filter((review) => filters.includes(review.rating.toString())));
    }
  }, [filters, reviews]);

  useEffect(() => {
    setHiddenReviews(reviewsToRender.length - displayedReviews);
  }, [reviewsToRender]);

  const handleThumbnailClick = (photoUrl) => {
    setDisplayedImage(photoUrl);
  };

  return (
    <Component data-testid="reviewList-component">
      <Menu>
        <label htmlFor="dropdown">
          {'Sort By: '}
          <select id="dropdown" onChange={(e) => changeSortMethod(e.target.value)}>
            <option value="relevant">Relevant</option>
            <option value="helpful">Helpful</option>
            <option value="newest">Newest</option>
          </select>
        </label>
        {submitMessage && <h3 data-testid="confirmation"><strong>Thank you! Your review has been submitted</strong></h3>}
        <div>
          <span>{'Filters: '}</span>
          {filters && filters.map((filter) => (<span key={filter}><strong>{`${filter} stars `}</strong></span>))}
        </div>
      </Menu>

      <List>
        {
        reviewsToRender.length
          ? reviewsToRender.slice(0, displayedReviews)
            .map((review) => (
              <Review
                key={review.review_id}
                review={review}
                handleThumbnailClick={handleThumbnailClick}
              />
            ))
          : <h1>Be the first to write a review!</h1>
        }
      </List>

      <ButtonContainer>
        { displayButton && (
        <StyledButton
          $theme={theme}
          data-testid="reviewList-button"
          type="button"
          onClick={(e) => handleClick(e)}
        >
          Show More Reviews
        </StyledButton>
        )}
      </ButtonContainer>

      { displayedImage && (
      <ModalWrapper $displaymodal={true}>
        <Modal $theme={theme} $displaymodal={true}>
          <img style={{'maxHeight': '500px', 'marginBottom': '20px'}} src={displayedImage} />
          <StyledButton
            $theme={theme}
            style={{ 'width': '150px' }}
            type="button"
            onClick={() => setDisplayedImage(false)}
          >
            Close
          </StyledButton>
        </Modal>
      </ModalWrapper>
      )}
    </Component>
  );
}

const Component = styled.div`
  padding-top: 20px;`;

const List = styled(Component)`
  max-height: 900px;
  overflow-y: scroll;`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid gray`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;`;

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    review_id: PropTypes.number.isRequired,
  })).isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  submitMessage: PropTypes.bool.isRequired,
};

export default ReviewList;
