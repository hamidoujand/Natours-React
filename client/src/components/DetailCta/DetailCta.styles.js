import styled from "styled-components";

export let StyledDetailCta = styled.div`
  & {
    padding: 10rem 20rem;
    margin-top: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    display: flex;
    background-color: white;
    padding: 2rem 2rem;
    align-items: center;
    border-radius: 5px;
  }

  .images {
    display: flex;
    margin-right: 3rem;
  }
  .tour-img {
    width: 10rem;
    height: 10rem;
    display: block;
    border-radius: 50%;
    &:not(:first-child) {
      margin-left: -5rem;
    }
  }
  .text {
  }
  .text-paragraph {
    margin-top: 0.5rem;
    font-size: 1.7rem;
  }
  .buttonWrapper {
    margin-left: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (max-width: 1370px) {
    .text-paragraph {
      margin-top: 0.5rem;
      font-size: 1.3rem;
    }
    .images {
      margin-right: 1rem;
    }

    .tour-img {
      width: 5rem;
      height: 5rem;
      display: block;
      border-radius: 50%;
    }
  }
  @media only screen and (max-width: 1148px) {
    .images {
      display: none;
    }

    .container {
      flex-direction: column;
    }
    .text-paragraph {
      margin: 2rem 0;
      text-align: center;
    }
  }
  @media only screen and (max-width: 800px) {
    .text {
      display: none;
    }
    .container {
      justify-content: center;
    }

    .buttonWrapper {
      margin: 0;
    }
  }
`;
