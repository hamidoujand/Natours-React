import styled from "styled-components";

export let NavContainer = styled.nav`
  //360px
  @media only screen and (min-width: 360px) {
    height: 8rem;
    width: 100%;
    background-color: ${(props) => props.theme.colors.colorPrimary};
    transition: all 0.4s;
    .nav-list {
      height: 100vh;
      width: 100%;
      background-color: ${(props) => props.theme.colors.colorPrimary};
      z-index: 8;
      position: fixed;
      top: 0;
      left: ${(props) => (props.isOpen ? 0 : "-100%")};
      transition: all 0.5s;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      list-style: none;
    }

    .nav-item {
      margin: 2rem 0;
    }

    .nav-link {
      text-decoration: none;
      &:link,
      &:visited {
        color: ${(props) => props.theme.colors.colorPrimaryLight};
        font-size: 2rem;
        border: 1px solid ${(props) => props.theme.colors.colorPrimaryVeryLight};
        padding: 0.7rem 1.8rem;
        border-radius: 4rem;
        transition: all 0.5s;
        text-transform: uppercase;
      }
      &:hover {
        background-color: white;
        color: ${(props) => props.theme.colors.colorPrimary};
        outline: none;
      }
    }

    .profile {
      width: 4rem;
      height: 4rem;
    }
    .profile-image {
      width: 100%;
      border-radius: 50%;
    }
  }

  //600px
  @media only screen and (min-width: 600px) {
    & {
      padding: 0 2rem;
    }

    .nav-list {
      height: 8rem;
      transition: none;
      position: initial;
      flex-direction: row;
    }

    .nav-item {
      margin: 0 2rem;
    }
    .right-nav {
      margin-right: auto;
    }
    .nav-link:visited,
    .nav-link:link {
      font-size: 1.4rem;
    }
  }
`;
