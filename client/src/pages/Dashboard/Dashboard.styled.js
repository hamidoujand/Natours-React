import styled from "styled-components";

export let StyledDashboard = styled.div`
  & {
    display: flex;
  }
  .sidebar-container {
    flex-basis: 30rem;
  }

  .user-panel {
    flex: 1;
    padding: 2rem 3rem;
  }

  @media only screen and (max-width: 1000px) {
    .sidebar-container {
      flex-basis: 0;
    }
  }
`;
