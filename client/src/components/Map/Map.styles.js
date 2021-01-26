import styled from "styled-components";

export let MapContainer = styled.section`
  & {
    margin-top: -3rem;
    transform: skewY(5deg);
  }
  .mapWrapper {
  }
  .skewed-wrapper {
    transform: skewY(-9deg);
  }

  .pointer {
    display: block;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.colorSecondary};
    cursor: pointer;
  }
`;
