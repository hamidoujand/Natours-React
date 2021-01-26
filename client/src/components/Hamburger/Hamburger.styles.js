import styled from "styled-components";

export let HamburgerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 10;
  overflow: hidden;
  cursor: pointer;
  span {
    width: 3rem;
    height: 5px;
    background-color: white;
    margin: 2px 0;
    transition: all 0.4s;
    transform-origin: 3px;
  }

  span:nth-child(2) {
    transform: translateX(${(props) => (props.isOpen ? "100%" : 0)});
    opacity: ${(props) => (props.isOpen ? 0 : 1)};
  }

  span:nth-child(1) {
    transform: rotate(${(props) => (props.isOpen ? "45deg" : 0)});
  }

  span:nth-child(3) {
    transform: rotate(${(props) => (props.isOpen ? "-45deg" : 0)});
  }

  @media only screen and (min-width: 600px) {
    display: none;
  }
`;
