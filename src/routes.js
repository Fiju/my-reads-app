import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/search" component={Search} />
  </Switch>
);
