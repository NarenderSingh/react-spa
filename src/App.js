import React, { Component } from "react";
import { Router } from "@reach/router";
import firebase from "./Firebase";

import Home from "./Home";
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import Login from "./Login";
import Meeting from "./Meeting";
import Register from "./Register";

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    const ref = firebase.database().ref("user");

    ref.on("value", spanshot => {
      let FBUser = spanshot.val();
      console.log(FBUser);
      this.setState({ user: FBUser });
    });
  }

  render() {
    return (
      <div>
        <Navigation user={this.state.user} />
        {this.state.user && <Welcome user={this.state.user} />}

        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" />
          <Meeting path="/meetings" />
          <Register path="/register" />
        </Router>
      </div>
    );
  }
}

export default App;
