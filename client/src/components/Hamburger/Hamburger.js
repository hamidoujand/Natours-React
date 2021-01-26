import React from "react";
import { HamburgerContainer } from "./Hamburger.styles";

export default function Hamburger(props) {
  return (
    <HamburgerContainer isOpen={props.isOpen} onClick={props.handleClick}>
      <span />
      <span />
      <span />
    </HamburgerContainer>
  );
}
