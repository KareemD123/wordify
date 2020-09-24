import React from "react";
import "./App.css";

import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Profile from "./components/Profile/Profile";
import API from "./components/API/API";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/" render={() => <Profile />} />
        <Route exact path="/API" render={() => <API />} />
        <Route exact path="/home" render={() => <Home />} />
      </Switch>
    </div>
  );
}

export default App;
