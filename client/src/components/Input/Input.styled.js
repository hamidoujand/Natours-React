import styled from "styled-components";

export let StyledInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    display: block;
    width: 70%;
    padding: 0.6rem 1rem;
    margin-bottom: 2rem;
    border: none;
    background-color: #eee;
    border-radius: 0.5rem;

    height: 5rem;
    &:focus {
      outline: none;
    }
  }
  label {
    display: block;
    font-size: 1.6rem;
    font-weight: 500;
    margin-bottom: 1.4rem;
    text-transform: uppercase;
  }

  @media only screen and (max-width: 940px) {
    input {
      width: 100%;
    }
    label {
      font-size: 1.2rem;
    }
  }
`;
