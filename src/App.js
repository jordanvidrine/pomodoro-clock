import React, { Component } from 'react';
import './App.css';
import Clock from './Clock';
import Settings from './Settings.js';
import SessionDisplay from './SessionDisplay';
import PomodoroDisplay from './PomodoroDisplay';

const DEFAULTS = {
  timer: 1500,
  sessionLength: 25,
  breakLength: 5,
  sessionsLeft: 5,
  sessionsComplete: 0,
  isRunning: false,
  isWorking: true,
  intervalId: null,
}

class Timer extends Component {
  constructor(props){
    super(props)
    this.state = {
      timer: DEFAULTS.timer,
      sessionLength: DEFAULTS.sessionLength,
      breakLength: DEFAULTS.breakLength,
      sessionsLeft: DEFAULTS.sessionsLeft,
      sessionsComplete: DEFAULTS.sessionsComplete,
      isRunning: DEFAULTS.isRunning,
      isWorking: DEFAULTS.isWorking,
      intervalId: DEFAULTS.intervalId,
    }
    this.handleIncOrDec = this.handleIncOrDec.bind(this);
    this.toggleClock = this.toggleClock.bind(this);
    this.countDown = this.countDown.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.workingOrNot = this.workingOrNot.bind(this);
    this.restart = this.restart.bind(this);
    this.stopClock = this.stopClock.bind(this);
  }
  handleIncOrDec(event){
    let value;
    let breakLength = this.state.breakLength;
    let sessionLength = this.state.sessionLength;
    let sessionsLeft = this.state.sessionsLeft;

    event.currentTarget.className === "up"?
    value = 1 : value = -1

    event.currentTarget.id === "Break-Length" ?
    this.setState({
      ...this.state,
      breakLength: breakLength + value >= 1 && breakLength + value <= 10 ? breakLength + value : breakLength
    }) :
    event.currentTarget.id === "Session-Length" ?
    this.setState({
      ...this.state,
      timer: sessionLength + value >= 1 && sessionLength + value <= 25 ? (sessionLength+value)*60 : sessionLength*60,
      sessionLength: sessionLength + value >= 1 && sessionLength + value <= 25 ? sessionLength + value : sessionLength
    }) :
    this.setState({
      ...this.state,
      sessionsLeft: sessionsLeft + value >= 1 ? sessionsLeft + value : sessionsLeft
    })
  }
  toggleClock(event){
    if (this.state.isRunning === true) {
      //get the current interval id to pass to the stop clock function
      let intervalId = this.state.intervalId;
      this.setState({
        //set isRunning to false
        isRunning: false,
        //set intervalId to Null now that it will stop running
        intervalId: 'null'
        //callback function to stop the clock when this state is set
      }, this.stopClock(intervalId))
    } else {
      //if the clock ISNT running, then star the clock and timer
      this.setState({
        ...this.state,
        isRunning: !this.state.isRunning,
        intervalId: this.countDown()
      })
    }
  }
  stopClock(intervalId){
    //turns off the countdown function by using the setInterval ID
    return clearInterval(intervalId)
  }
  countDown() {
    return setInterval(function(){
      this.decrementTimer();
      this.workingOrNot();

    }.bind(this),1000)
  }
  decrementTimer() {
    this.state.timer >= 1 && this.state.sessionsLeft !== 0 ?
    this.setState({
      timer: this.state.timer -1
    }) :
    this.setState({
      ...this.state
    })
  }
  workingOrNot(){
    //if user is currently working, the timer will set to the Break length
    //if the user is currently on break the timer will be reset to the session length
    let timer = this.state.isWorking ? (this.state.breakLength * 60) : (this.state.sessionLength * 60);
    //has the timer reached 0 yet?
    this.state.timer == 0 ?
    //if so, its time to reset the timer and the isWorking key
      this.setState({
        //if sessions left -1 does not = 0, then there are still sessions left
        //isWorking will be flipped if sessions are left, if no sessions are left, isWorking will be set to false
        isWorking: this.state.sessionsLeft - 1 > 0 ? !this.state.isWorking : false,
        timer,
        //if the current session is a break, it will reduce sessions left by one, if not, it will keep sessions left the same (only after a break is a full session complete)
        sessionsLeft: !this.state.isWorking ? this.state.sessionsLeft - 1 : this.state.sessionsLeft,
        sessionsComplete: !this.state.isWorking ? this.state.sessionsComplete + 1 : this.state.sessionsComplete
      }) :
      //if the timer isnt 0 yet, keep the state as it is
      this.setState({
        ...this.state,
      })
  }
  restart(){
    clearInterval(this.state.intervalId);
    this.setState({
      ...DEFAULTS
    })
  }
  render() {
    return (
      <div className="timer-container">
        {this.state.sessionsLeft === 0 ?
          <div className="timer-container">
            <h1>You finished!</h1>
            <button className="restart" onClick={this.restart}>
              <i class="fas fa-redo-alt fa-4x"></i>
            </button>
          </div>
          :
          <div className="timer-container">
        <Clock
          timer={this.state.timer}
          onClick={this.toggleClock}
          status={this.state.isRunning}
          isWorking={this.state.isWorking}
        />
        <div id="custom-settings">
          <Settings
            id="break-settings"
            settingType="Break-Length"
            default={this.state.breakLength}
            onClick={this.handleIncOrDec}
            isWorking={this.state.isWorking}
          />
          <Settings
            id="session-settings"
            settingType="Session-Length"
            default={this.state.sessionLength}
            onClick={this.handleIncOrDec}
            isWorking={this.state.isWorking}
          />
          <Settings
            id="num-sessions"
            settingType="Session-Count"
            default={this.state.sessionsLeft}
            onClick={this.handleIncOrDec}
          />
        </div>
        <PomodoroDisplay sessionsComplete={this.state.sessionsComplete} sessionsLeft={this.state.sessionsLeft} />
        {/*<SessionDisplay
          numMinutes={
            this.state.isWorking ? this.state.sessionLength : this.state.breakLength
          }
          minutesLeft={
            this.state.timer
          }
          isWorking={this.state.isWorking}
          isRunning={this.state.isRunning}
        />
        */}
        </div>
      }
      </div>
    );
  }
}
export default Timer;
