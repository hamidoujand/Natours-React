import React from "react";
import { StyledInput } from "./Input.styled";

export default function Input(props) {
  return (
    <StyledInput>
      <label>{props.label}</label>
      <input
        type={props.type}
        onChange={props.onInputChange}
        value={props.value}
        name={props.name}
        placeholder={props.placeholder}
      />
    </StyledInput>
  );
}
