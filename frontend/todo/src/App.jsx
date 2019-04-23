import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Todo from "./pages/todo";
import Login from "./pages/signInfo";
import TestPage from "./pages/testpage";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/todo" component={Todo} />
          <Route path="/test" component={TestPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
