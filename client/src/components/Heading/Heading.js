import React from "react";
import { HeadingContainer } from "./Heading.styles";

export default function Heading(props) {
  return (
    <HeadingContainer size={props.size}>
      <span>{props.children}</span>
    </HeadingContainer>
  );
}
