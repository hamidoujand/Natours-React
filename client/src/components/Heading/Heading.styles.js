import styled from "styled-components";

export let HeadingContainer = styled.h3`
  font-size: ${(props) => props.size};
  font-weight: 400;
  text-align: right;
  width: 55%;
  position: absolute;
  right: 2.3rem;
  bottom: 3rem;
  color: white;
  z-index: 10;
  span {
    padding: 1rem 1.5rem;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    line-height: 1;
    background-image: linear-gradient(
      to bottom right,
      rgba(125, 213, 111, 0.85),
      rgba(40, 180, 135, 0.85)
    );
  }
`;
