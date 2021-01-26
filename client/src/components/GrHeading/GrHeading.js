import React from "react";
import { GrHeadingContainer } from "./GrHeading.styles";

export default function GrHeading(props) {
  return (
    <GrHeadingContainer>
      <h1>{props.children}</h1>
    </GrHeadingContainer>
  );
}
