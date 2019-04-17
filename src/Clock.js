import React from 'react';

const Clock = props => {
  let minutes = Math.floor(props.timer / 60)
  let seconds = props.timer - minutes * 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  let time = `${minutes}:${seconds}`
    return (
      <div id="clock">
        <button onClick={props.onClick}
        className={ props.status ? "stop" : "play"}
        >
          {
            props.status ?
            <i className="fas fa-stop fa-3x"></i> :
            <i className="fas fa-play fa-3x"></i>
          }
        </button>
        <h1 className="clock-display">{time}</h1>
      </div>
    )
}

export default Clock
