import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import TourDetail from "./TourDetail/TourDetail";
export default function Router() {
  return (
    <div>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/tours/:tourId" component={TourDetail} />
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}
