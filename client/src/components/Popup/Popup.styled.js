import styled from "styled-components";
export let StyledPopup = styled.div`
  position: fixed;
  top: 4rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f68060;
  min-width: 50rem;
  padding: 1rem 2rem;
  box-shadow: 0 4px 3px 2px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  min-height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .popup-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 2rem;
  }

  .popup-message {
    color: white;
  }

  .popup-close {
    position: absolute;
    cursor: pointer;
    top: 10px;
    right: 20px;
    margin-bottom: 3rem;
    &::before,
    &::after {
      content: "";
      display: block;
      width: 20px;
      height: 4px;
      background-color: white;
      transform-origin: 13px;
    }
    &::after {
      transform: rotate(45deg);
    }
    &::before {
      transform: rotate(-45deg);
    }
  }
`;
