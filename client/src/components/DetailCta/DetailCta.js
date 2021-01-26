import React from "react";
import { StyledDetailCta } from "./DetailCta.styles";
import GrHeading from "../GrHeading/GrHeading";
import { ButtonPrimary } from "../../styles/GlobalStyles";

export default function DetailCta(props) {
  let renderImages = () => {
    if (props.images) {
      return props.images.map((img) => (
        <img
          className="tour-img"
          src={`/img/tours/${img}`}
          alt={img}
          key={img}
        />
      ));
    }
  };
  return (
    <StyledDetailCta>
      <div className="container">
        <div className="images">{renderImages()}</div>
        <div className="text">
          <GrHeading>What are you waiting for ?</GrHeading>
          <p className="text-paragraph">
            {props.duration} days, 1 adventure. Infinite memories. Make it yours
            today!
          </p>
        </div>
        <div className="buttonWrapper">
          <ButtonPrimary to={`${props.login ? "/booking" : "/login"}`}>
            {props.login ? "Book Tour" : "Login to book tour"}
          </ButtonPrimary>
        </div>
      </div>
    </StyledDetailCta>
  );
}
