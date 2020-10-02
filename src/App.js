import React, { Component } from "react";
import "./App.css";

import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import Document from "./components/Document/Document";
import VocabList from "./components/VocabList/VocabList";
import API from "./components/API/API";
import { Route, Switch } from "react-router-dom";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MyDocuments from "./components/MyDocuments/MyDocuments";
import userService from "./services/userService";
import DocumentSubmissionPage from "./pages/DocumentSubmissionPage/DocumentSubmissionPage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
    };
  }

  handleSignupOrLogin = () => {
    console.log("even i ran");
    this.setState({ user: userService.getUser() });
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  render() {
    return (
      <div className="App">
        <Nav user={this.state.user} handleLogout={this.handleLogout} />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/VocabList" render={() => <VocabList />} />
          <Route exact path="/MyDocuments" render={() => <MyDocuments />} />
          <Route exact path="/Document" render={() => <Document />} />
          <Route
            exact
            path="/API"
            render={() => <API user={this.state.user} />}
          />
          <Route exact path="/home" render={() => <Home />} />
          <Route
            exact
            path="/signup"
            render={({ history }) => (
              <SignupPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={({ history }) => (
              <LoginPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
