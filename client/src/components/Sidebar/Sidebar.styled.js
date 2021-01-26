import styled from "styled-components";

export let StyledSidebar = styled.div`
  .sidebar-nav {
    list-style: none;
    padding: 2rem 1rem;
    min-height: 103vh;
    background-image: linear-gradient(
      to bottom right,
      rgba(125, 213, 111, 0.85),
      rgba(40, 180, 135, 0.85)
    );
  }
  .sidebar-nav-item {
    margin: 3rem 0;
    position: relative;
    padding: 2rem 1rem;
    &::before {
      transition: all 0.3s;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background-color: white;
      z-index: 2;
    }
  }

  .nav-link {
    display: flex;
    align-items: center;
    font-size: 1.8rem;
    color: white;
    text-decoration: none;
    margin-left: 1rem;
    transition: all 0.3s;
    position: relative;
    z-index: 10;
    & i {
      margin-right: 1rem;
    }
    & span {
    }
  }
  .sidebar-nav-item:hover::before {
    width: 100%;
  }
  .sidebar-nav-item:hover .nav-link {
    color: ${(props) => props.theme.colors.colorSecondary};
  }
  .toggler {
    display: none;
  }
  @media only screen and (max-width: 1000px) {
    .sidebar-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      top: 0;
      right: 0;
      width: 100%;
      z-index: 10;
      height: 100%;
      transform: translateY(${(props) => (props.sidebarMobile ? "0" : "100%")});
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
    .toggler {
      display: inline-block;
      position: fixed;
      bottom: 3rem;
      left: 3rem;
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      background-image: linear-gradient(
        to bottom right,
        rgba(125, 213, 111, 0.85),
        rgba(40, 180, 135, 0.85)
      );
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 2rem;
      z-index: 11;
      cursor: pointer;
    }
  }

  @media only screen and (min-width: 380px) {
    .sidebar-nav {
      transition: all 0.5s ease-in;
    }
  }
  @media only screen and (min-width: 980px) {
    .sidebar-nav {
      transition: none;
    }
  }
`;
