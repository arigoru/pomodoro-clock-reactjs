import React, { Component } from "react";

let intervalReference;
const callInterval = 100;

class DurationControls extends Component {
  state = {};

  increaseBreak = () => {
    this.props.handler(1, 1);
  };
  decreaseBreak = () => {
    this.props.handler(1, -1);
  };
  increaseSession = () => {
    this.props.handler(0, 1);
  };
  decreaseSession = () => {
    this.props.handler(0, -1);
  };
  clearCall = () => {
    clearInterval(intervalReference);
    window.removeEventListener("mouseup", this.clearCall);
    window.removeEventListener("mouseout", this.clearCall);
  };
  startCalls = func => {
    // func();
    window.addEventListener("mouseup", this.clearCall);
    window.addEventListener("mouseout", this.clearCall);
    intervalReference = setInterval(func, callInterval);
  };

  render() {
    return (
      <React.Fragment>
        <div className="break-duration time-control">
          <h6 className="text-center" id="break-label">
            Break Length
          </h6>
          <div
            className=" button button-in"
            id="break-increment"
            onClick={this.increaseBreak}
            onMouseDown={e => {
              if (e.button === 0) this.startCalls(this.increaseBreak);
            }}
          >
            +
          </div>
          <div
            className=" button button-in"
            id="break-decrement"
            onClick={this.decreaseBreak}
            onMouseDown={e => {
              if (e.button === 0) this.startCalls(this.decreaseBreak);
            }}
          >
            -
          </div>
        </div>
        <div className="session-duration time-control">
          <h6 className="text-center" id="session-label">
            Session Length
          </h6>
          <div
            className="button button-in"
            id="session-increment"
            onClick={this.increaseSession}
            onMouseDown={e => {
              if (e.button === 0) this.startCalls(this.increaseSession);
            }}
          >
            +
          </div>
          <div
            className="button button-in"
            id="session-decrement"
            onClick={this.decreaseSession}
            onMouseDown={e => {
              if (e.button === 0) this.startCalls(this.decreaseSession);
            }}
          >
            -
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DurationControls;
