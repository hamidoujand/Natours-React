import React, { useEffect } from "react";
import { connect } from "react-redux";
import Sidebar from "../../components/Sidebar/Sidebar";
import { StyledDashboard } from "./Dashboard.styled";
import { Switch, Route } from "react-router-dom";
import UserProfile from "../../components/UserProfile/UserProfile";

function Dashboard(props) {
  let { history, user, match } = props;
  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [history, user]);
  return (
    <StyledDashboard>
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="user-panel">
        <Switch>
          <Route exact path={`${match.path}`} component={UserProfile} />
        </Switch>
      </div>
    </StyledDashboard>
  );
}

let mapStateToProps = (state) => {
  return {
    user: state.authState.user,
  };
};

export default connect(mapStateToProps)(Dashboard);
