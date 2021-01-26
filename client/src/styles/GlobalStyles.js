import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";

let GlobalStyles = createGlobalStyle`
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}


html {
  font-size: 62.5%;
}

body {
  font-family: "Roboto", sans-serif;
  color: ${(props) => props.theme.colors.colorPrimary};
 
}

`;

export let ButtonPrimary = styled(Link)`
  &:link,
  &:visited {
    font-size: 1.5rem;
    text-decoration: none;
    display: inline-block;
    background-color: ${(props) => props.theme.colors.colorSecondary};
    min-width: 10rem;
    text-align: center;
    padding: 1.4rem 0.5rem;
    color: white;
    border-radius: 4rem;
    transition: all 0.3s ease-in;
  }
  &:hover {
    transform: translateY(-0.4rem);
    box-shadow: 0 4px 8px 6px rgba(0, 0, 0, 0.2);
  }
`;

export let StyledSubmitButton = styled.button`
  font-size: 1.5rem;
  cursor: pointer;
  display: inline-block;
  border: none;
  background-color: ${(props) => props.theme.colors.colorSecondary};
  min-width: 10rem;
  text-align: center;
  padding: 1.4rem 0.5rem;
  color: white;
  border-radius: 4rem;
  transition: all 0.3s ease-in;
  outline: none;
  &:hover {
    transform: translateY(-0.4rem);
    box-shadow: 0 4px 8px 6px rgba(0, 0, 0, 0.2);
  }
`;
export default GlobalStyles;
