import React from "react";
import { DetailImagesContainer } from "./DetailImages.styles";

export default function DetailImages(props) {
  let images = props.images.map((img) => (
    <img key={img} className="image" src={`/img/tours/${img}`} alt={img} />
  ));
  return (
    <DetailImagesContainer>
      <div className="images-container">
        <div className="skewed-wrapper">{images}</div>
      </div>
    </DetailImagesContainer>
  );
}
