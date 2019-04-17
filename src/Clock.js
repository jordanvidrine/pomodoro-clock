import React from 'react';

const Clock = props => {
  let minutes = Math.floor(props.timer / 60)
  let seconds = props.timer - minutes * 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  let time = `${minutes} : ${seconds}`
    return (
      <div id="clock">
        <p>{time}</p>
        <button onClick={props.onClick}>
          {
              props.status ? <i className="fas fa-stop fa-2x"></i> : <i className="fas fa-play fa-2x"></i>
          }
        </button>
      </div>
    )
}

export default Clock
