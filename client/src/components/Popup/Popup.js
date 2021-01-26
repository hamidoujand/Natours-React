import React from "react";
import { StyledPopup } from "./Popup.styled";

export default function Popup(props) {
  return (
    <StyledPopup>
      <div className="popup-container">
        <h2 className="popup-message">{props.message}</h2>
        <span onClick={props.closePopup} className="popup-close"></span>
      </div>
    </StyledPopup>
  );
}
