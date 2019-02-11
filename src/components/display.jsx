import React, { Component } from "react";

const statusStrings = ["Session", "Break"];

class Display extends Component {
  state = {};

  render() {
    return this.props.status.flick ? (
      <div className="timer crt">
        <div className="display-3 time-label" id="break-length">
          {this.props.status.breakDuration}
        </div>
        <div className="screen-center">
          <h1 className="display-1 time-label" id="time-left">
            {this.props.display}
          </h1>
          <h1 className="display-4 time-label" id="timer-label">
            {statusStrings[this.props.status.status]}
          </h1>
        </div>
        <div className="display-3 time-label" id="session-length">
          {this.props.status.sessionDuration}
        </div>
      </div>
    ) : (
      <div className="timer" />
    );
  }
}

export default Display;
