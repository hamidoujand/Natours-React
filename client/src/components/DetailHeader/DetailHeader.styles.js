import styled from "styled-components";

export let DetailHeaderContainer = styled.header`
  & {
    height: 80vh;
    background-image: linear-gradient(
        to bottom right,
        rgba(125, 213, 111, 0.75),
        rgba(40, 180, 135, 0.75)
      ),
      url(${({ imageCover }) => imageCover});
    clip-path: polygon(0 0, 100% 0, 100% 70%, 0 100%);
    background-position: center center;
    background-size: cover;
    position: relative;
  }
  .heading-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
  }
  .heading {
    font-size: 6rem;
    font-weight: 200;
    text-align: center;

    span {
      padding: 1rem 4rem;
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;

      color: white;
      line-height: 1;
      background-image: linear-gradient(
        to bottom right,
        rgba(125, 213, 111, 0.85),
        rgba(40, 180, 135, 0.85)
      );
    }
  }
  .price-duration {
    display: flex;
    margin-top: 4rem;
    justify-content: center;
    align-items: center;

    .detail {
      display: flex;
      align-items: center;
      margin: 0 2rem;
      span {
        font-size: 1.5rem;
        font-weight: 600;
        color: white;
      }
      i {
        color: white;
        font-size: 1.5rem;
        margin-right: 0.5rem;
      }
    }
  }
  //1200px
  @media only screen and (max-width: 1200px) {
    & {
      height: 60vh;
    }
    .heading {
      font-size: 4rem;
      span {
        padding: 1rem 2rem;
      }
    }
  }

  //960px

  @media only screen and (max-width: 960px) {
    .price-duration {
      flex-direction: column;
    }
    .price-duration .detail {
      justify-content: space-between;
      margin: 1rem 0;
    }
    & {
      height: 50vh;
    }
    .heading {
      font-size: 2.5rem;
      span {
        padding: 0;
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .price-duration .detail {
      margin: 1rem 0;
      flex-direction: column;
    }
    .price-duration .detail span {
      font-size: 1.2rem;
    }
  }
`;
