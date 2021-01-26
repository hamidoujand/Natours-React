import styled from "styled-components";

export let DetailImagesContainer = styled.div`
  & {
    margin: 2rem 0;
    padding: 2rem;
  }
  .images-container {
    transform: skewY(+6deg);
  }
  .skewed-wrapper {
    display: flex;
    transform: skewY(-10deg);
    justify-content: center;
    align-items: center;
  }
  .image {
    width: 34.333%;
  }
`;
