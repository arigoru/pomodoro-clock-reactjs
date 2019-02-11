import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Display from "./components/display";
import InfoBar from "./components/infoBar";
import DurationControls from "./components/durationControls";

function parseTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;
  let result = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
  return result.concat(seconds < 10 ? `0${seconds}` : `${seconds}`);
}

let timerReference;

class App extends Component {
  state = {
    flick: true,
    ticking: false,
    breakDuration: 5,
    sessionDuration: 25,
    timerValue: 25 * 60, // time to display in seconds
    status: 0 // 0 - session, 1 - break
    // currentTime: ,
  };

  playNotification = () => {
    this.notificationSound.play();
    setTimeout(() => {
      this.notificationSound.pause();
      this.notificationSound.currentTime = 0;
    }, 3000);
    return 0;
  };

  switchSession = () => {
    if (this.state.status === 0) {
      this.setState({
        status: 1,
        timerValue: 60 * this.state.breakDuration
      });
    } else {
      this.setState({
        status: 0,
        timerValue: 60 * this.state.sessionDuration
      });
    }
  };

  secondTickHandler = () => {
    if (this.state.timerValue === 0) {
      this.playNotification();
      this.switchSession();
    } else {
      this.setState({
        timerValue: this.state.timerValue - 1
      });
    }
  };

  stopSession = () => {
    clearInterval(timerReference);
    this.setState({
      ticking: false
    });
  };

  startSession = () => {
    timerReference = setInterval(this.secondTickHandler, 1000);
    this.setState({
      ticking: true
    });
  };

  changeDuration = (type, duration) => {
    if (!this.state.ticking) {
      let newState = {};
      // 0 for session duration, 1 for break duration
      if (type === 0) {
        let newDuration = this.state.sessionDuration + duration;
        if (newDuration > 0 && newDuration <= 60) {
          newState.sessionDuration = newDuration;
          if (this.state.status === 0) newState.timerValue = 60 * newDuration;
        }
      } else {
        let newDuration = this.state.breakDuration + duration;
        if (newDuration > 0 && newDuration <= 60) {
          newState.breakDuration = newDuration;
          if (this.state.status === 1) newState.timerValue = 60 * newDuration;
        }
      }
      this.setState(newState);
    }
  };
  resetState = () => {
    this.notificationSound.pause();
    this.notificationSound.currentTime = 0;
    clearInterval(timerReference);
    this.setState({
      timerValue: 25 * 60,
      status: 0,
      sessionDuration: 25,
      breakDuration: 5,
      ticking: false
    });
  };

  toggleFlick = () => {
    this.setState({
      flick: !this.state.flick
    });
  };

  render() {
    return (
      <div className="App">
        <div className="secondary-body" />
        <div className="top-bar" />
        <DurationControls
          toggleFlick={this.toggleFlick}
          handler={this.changeDuration}
        />
        <InfoBar
          startStopHandler={
            this.state.ticking ? this.stopSession : this.startSession
          }
          resetHandler={this.resetState}
        >
          {this.state.ticking ? "Stop" : "Start"}
        </InfoBar>
        <Display
          status={this.state}
          display={parseTime(this.state.timerValue)}
        />
        <audio
          id="beep"
          preload="auto"
          src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
          ref={audio => {
            this.notificationSound = audio;
          }}
        />
      </div>
    );
  }
}

export default App;
