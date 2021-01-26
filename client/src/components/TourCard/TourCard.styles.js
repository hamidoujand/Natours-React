import styled from "styled-components";

export let CardContainer = styled.div`
  & {
    background-color: white;
    width: 35rem;
    border-radius: 7px;
    overflow: hidden;
    box-shadow: 0 4px 2px rgba(0, 0, 0, 0.2);
  }

  .image-header-wrapper {
    width: 100%;
    height: 20rem;
    position: relative;
    clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
    margin-bottom: 1rem;
  }
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      to bottom right,
      rgba(125, 213, 111, 0.75),
      rgba(40, 180, 135, 0.75)
    );
  }
  .tour-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .card-detail {
    padding: 1rem 2.5rem;
  }
  .card-detail-header {
    font-size: 1.2rem;
    font-weight: 500;
    text-transform: uppercase;
    margin: 1rem 0;
  }
  .tour-summary {
    font-size: 1.4rem;
    color: ${(props) => props.theme.colors.colorPrimaryLight};
    font-family: "Montserrat";
    margin: 4rem 0;
  }

  .card-icons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin: 4rem 0;
  }

  .icon {
    & {
      display: flex;
      align-items: center;
    }
    span {
      font-size: 1.3rem;
      font-weight: 400;
    }
    i {
      color: ${(props) => props.theme.colors.colorSecondary};
      margin-right: 1rem;
      font-size: 1.2rem;
    }
  }

  .cta {
    margin-bottom: 4rem;
    display: flex;
    justify-content: space-around;
  }

  .price {
    h5 {
      font-size: 1.5rem;
      font-weight: 500;
      margin-right: 2rem;
      margin-bottom: 1rem;
    }
    span {
      font-size: 1rem;
      color: ${(props) => props.theme.colors.colorPrimaryLight};
      font-weight: 400;
    }
  }
  .action {
  }
`;
