import React, { useEffect } from "react";
import { AppContainer } from "./App.styles";
import Navbar from "./components/Navbar/Navbar";
import Router from "./pages/Router";
import { connect } from "react-redux";
import { getUser } from "./actions/authActions";

function App(props) {
  let { getUser } = props;
  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <AppContainer>
      <Navbar />
      <Router />
    </AppContainer>
  );
}

export default connect(null, { getUser })(App);
