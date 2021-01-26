import styled from "styled-components";

export let GrHeadingContainer = styled.div`
  & {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h1 {
    display: inline-block;
    background-image: linear-gradient(
      to bottom right,
      rgba(125, 213, 111, 0.85),
      rgba(40, 180, 135, 0.85)
    );
    font-size: 3.5rem;
    font-weight: 400;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  @media only screen and (max-width: 1140px) {
    h1 {
      font-size: 2.3rem;
    }
  }
  @media only screen and (max-width: 600px) {
    h1 {
      font-size: 1.8rem;
    }
  }
`;
