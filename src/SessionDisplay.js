import React, { Component } from 'react';

class SessionDisplay extends Component {
  constructor(props){
    super(props)
  }

  render(){
    let liColor = this.props.isWorking ? '#ADFF2F' : "#00BFFF"
    let numThirds = this.props.numMinutes*3
    let liWidth = (325/numThirds) - 1;
    liWidth = liWidth+'px';
    let liStyle = {
      width: liWidth,
      margin: '0 1px 0 0',
      borderRadius: 2,
      height: 30,
      backgroundColor: liColor,
    }
     let minuteUI = Array(Math.floor((this.props.numMinutes*3)-(this.props.minutesLeft/60*3)))
                    .fill().map((v,idx) => {
       return <li key={idx} style={liStyle}></li>
     })
    return (
      <div id="session-display">
        <ul className="ul-minutes">
          {minuteUI}
        </ul>
        <div>
          {this.props.isWorking ? <h1>Work Mode!</h1> : <h1>Break Mode</h1>}
        </div>
      </div>
    )

  }
}

export default SessionDisplay
