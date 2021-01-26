import styled from "styled-components";
export let HomeContainer = styled.main`
  & {
    padding: 2rem 1rem;
    margin: 2rem 0;
  }

  .tours-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40rem, min-content));
    justify-content: center;
    justify-items: center;
    gap: 2rem;
  }
`;
