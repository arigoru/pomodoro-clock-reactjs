import React, { Component } from "react";

class InfoBar extends Component {
  state = {};
  render() {
    return (
      <div className="info-bar">
        <div className="display-4" id="app-label">
          Pomodoro Clock
        </div>
        <h1
          onClick={this.props.startStopHandler}
          className="text-center display-4 button"
          id="start_stop"
        >
          {this.props.children}
        </h1>
        <h1
          onClick={this.props.resetHandler}
          className="text-center display-4 button"
          id="reset"
        >
          Reset
        </h1>
      </div>
    );
  }
}

export default InfoBar;
