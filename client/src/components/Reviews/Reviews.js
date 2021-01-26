import React from "react";
import { ReviewsContainer } from "./Reviews.styles";

export default function Reviews(props) {
  let renderStars = (rating) => {
    if (props.reviews) {
      let fullStars = Math.floor(rating);
      let emptyStars = 5 - Math.floor(rating);
      let allStars = [];
      for (let i = 0; i < fullStars; i++) {
        allStars.push(
          <i className="fas fa-star" key={i} style={{ color: "#F0C63F" }}></i>
        );
      }

      for (let i = 0; i < emptyStars; i++) {
        allStars.push(
          <i className="fas fa-star" key={i} style={{ color: "grey" }}></i>
        );
      }
      return allStars;
    }
  };
  let reviews = () => {
    if (props.reviews) {
      return props.reviews.map((review) => (
        <div className="review">
          <div className="review-user">
            <img
              src={`/img/users/${review.user.photo}`}
              alt={review.user.name}
              className="review-user-image"
            />
            <h2 className="review-username">{review.user.name}</h2>
          </div>
          <p className="review-text">{review.review}</p>
          <div className="ratings">{renderStars(review.rating)}</div>
        </div>
      ));
    }
  };

  return (
    <ReviewsContainer>
      <div className="skew-container">
        <div className="reviews">{reviews()}</div>
      </div>
    </ReviewsContainer>
  );
}
