import React from "react";
import GrHeading from "../GrHeading/GrHeading";
import { TourDescriptionContainer } from "./TourDescription.styles";
import moment from "moment";
export default function TourDescription(props) {
  let {
    startDates,
    maxGroupSize,
    ratingsAverage,
    ratingsQuantity,
    difficulty,
    guides,
    name,
    description,
  } = props.tour;
  let tourGuides = guides.map((guide) => {
    return (
      <li className="guide" key={guide.name}>
        <img
          src={`/img/users/${guide.photo}`}
          alt={guide.name}
          className="guide-image"
        />
        <h4 className="guide-role">{guide.role}</h4>
        <span className="guide-name">{guide.name}</span>
      </li>
    );
  });
  return (
    <TourDescriptionContainer>
      <div className="wrapper">
        <div className="left">
          <GrHeading>Quick Facts</GrHeading>
          <div className="center">
            <div className="facts">
              <div className="fact">
                <i className="fas fa-calendar-alt"></i>
                <h4>Next Date</h4>
                <p>{moment(startDates[1]).format("MMMM YYYY")}</p>
              </div>
              <div className="fact">
                <i className="fas fa-chart-line"></i>
                <h4>Difficulty</h4>
                <p>{difficulty}</p>
              </div>
              <div className="fact">
                <i className="fas fa-user"></i>
                <h4>Participants</h4>
                <p>{maxGroupSize} people</p>
              </div>
              <div className="fact">
                <i className="fas fa-star"></i>
                <h4>Rating</h4>
                <p>
                  {ratingsAverage}/{ratingsQuantity}
                </p>
              </div>
            </div>
          </div>
          <div className="center">
            <div className="guides">
              <GrHeading>Your Tour Guides</GrHeading>
              <ul className="guides-wrapper">{tourGuides}</ul>
            </div>
          </div>
        </div>
        <div className="right">
          <GrHeading>About {name}</GrHeading>
          <div className="description-text">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </TourDescriptionContainer>
  );
}
