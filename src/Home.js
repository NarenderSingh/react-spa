import React, { Component } from "react";
import { Link } from "@reach/router";

class Home extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-10 col-md-10 col-lg-8 col-xl-7">
            <h4 className="display-4 text-primary mt-3 mb-2">Meeting Log</h4>
            <p className="lead">
              This simple app creates meetings, allows people to check in, and
              picks random users to award giveaways. It's a good example of a
              Single Page Application which includes connection to a database
              and routing. It's a practical way to learn{" "}
              <a href="https://react.js">React.js</a> with{" "}
              <a href="https://firebase.google.com">Firebase</a>.
            </p>

            {user == null && (
              <div>
                <Link to="/register" className="btn btn-primary btn-sm mr-2">
                  Register
                </Link>

                <Link to="/login" className="btn btn-primary btn-sm mr-2">
                  Log In
                </Link>
              </div>
            )}

            {user && (
              <Link to="/meetings" className="btn btn-primary btn-sm mr-2">
                Meetings
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
