import styled from "styled-components";

export let StyledUserProfileForm = styled.div`
  & {
    box-shadow: 0 3px 4px 4px rgba(0, 0, 0, 0.1);
  }
  .user-profile-form {
    background-color: white;
    padding: 2rem 4rem;
    min-height: 40rem;
    border-radius: 4px;
  }

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
  }
  .avatar-pic {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    display: block;
    margin-right: 3rem;
  }
  .avatar-input {
    display: none;
  }
  .avatar-label {
    font-size: 1.7rem;
    color: ${(props) => props.theme.colors.colorSecondary};
    cursor: pointer;
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 4rem;
  }

  @media only screen and (max-width: 820px) {
    .avatar-label {
      font-size: 1.4rem;
    }
  }
`;
