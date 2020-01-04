import React, { Component } from "react";
import firebase from "./Firebase";
import { GoTrashcan } from "react-icons/go";
import { navigate } from "@reach/router";
import { FaLink } from "react-icons/fa";

class MeetingList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  deleteMeetings = (e, meetingID) => {
    e.preventDefault();

    const ref = firebase
      .database()
      .ref(`meetings/${this.props.userID}/${meetingID}`);

    ref.remove();
  };

  render() {
    const { meetings } = this.props;
    const myMeetings = meetings.map(item => (
      <div className="list-group-item d-flex" key={item.meetingID}>
        <section className="btn-group align-self-center" role="group">
          <button
            className="btn btn-sm btn-outline-secondary"
            title="Delete Meeting"
            onClick={e => this.deleteMeetings(e, item.meetingID)}
          >
            <GoTrashcan />
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            title="Check In"
            onClick={() =>
              navigate(`/checkin/${this.props.userID}/${item.meetingID}`)
            }
          >
            <FaLink />
          </button>
        </section>

        <section className="pl-3 text-left align-self-center">
          {item.meetingName}
        </section>
      </div>
    ));

    return <div>{myMeetings}</div>;
  }
}

export default MeetingList;
