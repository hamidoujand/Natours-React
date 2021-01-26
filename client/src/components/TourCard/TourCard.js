import React from "react";
import Heading from "../Heading/Heading";
import { CardContainer } from "./TourCard.styles";
import moment from "moment";
import { ButtonPrimary } from "../../styles/GlobalStyles";

export default function TourCard(props) {
  let {
    imageCover,
    name,
    difficulty,
    duration,
    summary,
    startLocation,
    startDates,
    maxGroupSize,
    price,
    ratingsAverage,
    ratingsQuantity,
    _id,
  } = props.tour;
  return (
    <CardContainer>
      <div className="image-header-wrapper">
        <div className="overlay"></div>
        <img
          src={`/img/tours/${imageCover}`}
          alt={name}
          className="tour-image"
        />
        <Heading size="3.5rem">{name}</Heading>
      </div>
      <div className="card-detail">
        <h4 className="card-detail-header">
          {difficulty} {duration} day tour
        </h4>
        <p className="tour-summary">{summary}</p>
        <div className="card-icons">
          <div className="icon">
            <i className="fas fa-map-pin"></i>
            <span>{startLocation.description}</span>
          </div>
          <div className="icon">
            <i className="fas fa-calendar-alt"></i>
            <span>{moment(startDates[0]).format("MMMM YYYY")}</span>
          </div>
          <div className="icon">
            <i className="fas fa-flag"></i>
            <span>4 stops</span>
          </div>
          <div className="icon">
            <i className="fas fa-user"></i>
            <span>{maxGroupSize} people</span>
          </div>
        </div>
      </div>
      <div className="cta">
        <div className="price">
          <h5>
            ${price} <span>per person</span>
          </h5>
          <h5>
            {ratingsAverage} <span>Rating ({ratingsQuantity})</span>
          </h5>
        </div>
        <div className="action">
          <ButtonPrimary to={`/tours/${_id}`}>Detail</ButtonPrimary>
        </div>
      </div>
    </CardContainer>
  );
}
