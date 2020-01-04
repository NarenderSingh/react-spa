import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import firebase from "./Firebase";

import Home from "./Home";
import Welcome from "./Welcome";
import Navigation from "./Navigation";
import Login from "./Login";
import Meeting from "./Meeting";
import Register from "./Register";
import CheckIn from "./CheckIn";
import Attendees from "./Attendees";

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
      displayName: null,
      userID: null,
      meetings: [],
      howManyMeetings: 0
    };

    this.registerUser = this.registerUser.bind(this);
  }

  componentDidMount() {
    // const ref = firebase.database().ref("user");

    // ref.on("value", spanshot => {
    //   let FBUser = spanshot.val();
    //   console.log(FBUser);
    //   this.setState({ user: FBUser });
    // });

    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });

        const ref = firebase.database().ref(`meetings/` + FBUser.uid);

        ref.on("value", snaphot => {
          let meetings = snaphot.val();
          let meetingsList = [];

          for (let item in meetings) {
            meetingsList.push({
              meetingID: item,
              meetingName: meetings[item].meetingName
            });
          }

          this.setState({
            meetings: meetingsList,
            howManyMeetings: meetingsList.length
          });
        });
      } else {
        this.setState({ user: null });
      }
    });
  }

  registerUser(userName) {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate("/meetings");
      });
    });
  }

  logOutUser = e => {
    e.preventDefault();

    this.setState({
      user: null,
      displayName: null,
      userID: null
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/login");
      });
  };

  addMeeting = meetingName => {
    const ref = firebase.database().ref(`meetings/${this.state.user.uid}`);

    ref.push({ meetingName: meetingName });
  };

  render() {
    return (
      <div>
        <Navigation user={this.state.user} logOutUser={this.logOutUser} />
        {this.state.user && (
          <Welcome
            userName={this.state.displayName}
            logOutUser={this.logOutUser}
          />
        )}

        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" />
          <Meeting
            path="/meetings"
            addMeeting={this.addMeeting}
            meetings={this.state.meetings}
            userID={this.state.userID}
          />
          <CheckIn path="/checkin/:userID/:meetingID" />
          <Attendees
            path="/attendees/:userID/:meetingID"
            adminUser={this.state.userID}
          />
          <Register path="/register" registerUser={this.registerUser} />
        </Router>
      </div>
    );
  }
}

export default App;
