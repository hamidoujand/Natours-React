import styled from "styled-components";
export let ReviewsContainer = styled.section`
  & {
    padding: 10rem 5rem;
    background-image: linear-gradient(
      to bottom right,
      rgba(125, 213, 111, 0.85),
      rgba(40, 180, 135, 0.85)
    );
    transform: skewY(-4deg);
    margin-top: 1rem;
  }
  .skew-container {
    transform: skewY(4deg);
  }

  .reviews {
    display: flex;
    overflow-x: scroll;
    flex-wrap: nowrap;
    padding: 2rem 4rem;
  }
  .review {
    min-width: 30rem;
    padding: 2rem 4rem;
    background-color: rgba(256, 256, 256, 0.9);
    margin: 1rem 2rem;
    min-height: 35rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
  }
  .review-user {
    display: flex;
    align-items: center;
  }
  .review-username {
    font-weight: 700;
    color: ${(props) => props.theme.colors.colorPrimary};
    font-size: 1.6rem;
  }
  .review-user-image {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    margin-right: 1.8rem;
  }
  .review-text {
    font-size: 1.3rem;
    font-family: "Montserrat";
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
  .ratings {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
  }
`;
