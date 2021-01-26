import React from "react";
import { DetailHeaderContainer } from "./DetailHeader.styles";

export default function DetailHeader(props) {
  let { name, duration, imageCover, startLocation } = props;
  let imageCoverAbs = `/img/tours/${imageCover}`;
  return (
    <DetailHeaderContainer imageCover={imageCoverAbs}>
      <div className="heading-wrapper">
        <h1 className="heading">
          <span>{name}</span>
        </h1>
        <div className="price-duration">
          <div className="detail">
            <i className="fas fa-clock"></i>
            <span>{duration} days tour</span>
          </div>
          <div className="detail">
            <i className="fas fa-map-pin"></i>
            <span>{startLocation}</span>
          </div>
        </div>
      </div>
    </DetailHeaderContainer>
  );
}
