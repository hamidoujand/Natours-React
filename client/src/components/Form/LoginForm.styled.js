import styled from "styled-components";

export let StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: white;
  width: 60rem;
  margin: 4rem auto;
  box-shadow: 0 4px 3px 2px rgba(0, 0, 0, 0.2);
  .header-wrapper {
    margin-bottom: 4rem;
  }

  @media only screen and (max-width: 600px) {
    & {
      max-width: 60rem;
    }
  }
`;
