import styled from "styled-components";

export let TourDescriptionContainer = styled.div`
  & {
    padding: 10rem 20rem;
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
  }

  .left {
  }

  .facts {
    padding: 2rem 4rem;
  }

  .fact {
    display: flex;
    align-items: center;
    & * {
      margin: 1.6rem 0;
      margin-right: 1rem;
    }
    i {
      color: ${(props) => props.theme.colors.colorSecondary};
      font-size: 2rem;
    }
    h4 {
      font-size: 1.8rem;
      font-weight: 400;
    }
    p {
      font-size: 1.3rem;
      color: ${(props) => props.theme.colors.colorPrimaryLight};
    }
  }

  .guides-wrapper {
    margin-top: 4rem;
  }
  .guides {
    margin-top: 4rem;
  }
  .guide {
    display: flex;
    align-items: center;

    & * {
      margin-top: 1rem;
      margin-right: 2rem;
    }
  }
  .guide-image {
    display: block;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
  }
  .guide-name {
    font-size: 1.4rem;
    font-weight: 200;
  }
  .guide-role {
    font-size: 1.8rem;
  }
  .description-text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 4rem;
    p {
      font-size: 1.7rem;
      font-weight: 300;
      line-height: 2;
    }
  }

  @media only screen and (max-width: 1350px) {
    & {
      padding: 5rem 10rem;
    }
    .description-text {
      padding: 2rem 1rem;
      P {
        font-size: 1.4rem;
      }
    }
  }

  @media only screen and (max-width: 1100px) {
    .center {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .right {
      margin-top: 10rem;
    }
  }

  @media only screen and (max-width: 500px) {
    & {
      padding: 1rem;
    }

    .description-text {
      padding: 1rem;
      P {
        font-size: 1.2rem;
        text-align: center;
      }
    }
  }
`;
