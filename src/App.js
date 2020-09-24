import React, { Component } from "react";
import "./App.css";

import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Profile from "./components/Profile/Profile";
import API from "./components/API/API";
import { Route, Switch } from "react-router-dom";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pagesLoginPage/LoginPage";
import userService from "../../services/userService";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
    };
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  render() {
    return (
      <div className="App">
        <Nav />
        <Nav user={this.state.user} handleLogout={this.handleLogout} />
        <Switch>
          <Route exact path="/" render={() => <Profile />} />
          <Route exact path="/API" render={() => <API />} />
          <Route exact path="/home" render={() => <Home />} />
          <Route exact path="/signup" render={() => <SignupPage />} />
          <Route
            exact
            path="/login"
            render={() => (
              <LoginPage handleSignupOrLogin={this.handleSignupOrLogin} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
