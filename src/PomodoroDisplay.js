import React from 'react';

const PomodoroDisplay = props =>{
  let ulStyle = {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0 0 0',
    padding: 0,
  }

  let liStyleComplete = {
    margin: '0 10px 0 0',
    color: 'rgb(93, 170, 110)',
    backgroundColor: '#C0FF3E',
    width: 50,
    height: 50,
    borderRadius: '30px',
    display: 'flex',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center'
  }

  let liStyleIncomplete = {
    margin: '0 10px 0 0',
    color: 'grey',
    backgroundColor: '#C0FF3E',
    width: 50,
    height: 50,
    borderRadius: '30px',
    display: 'flex',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center'
  }

  let pomodoros = Array(props.sessionsLeft+props.sessionsComplete).fill().map((v,idx)=>{
    if(idx < props.sessionsComplete) {
      return <li style={liStyleComplete}><i class="fas fa-check-circle fa-3x"></i></li>
    } return <li style={liStyleIncomplete}><i class="fas fa-circle fa-3x"></i></li>
  })
  return(
    <div id="pomodoros">
    <ul style={ulStyle}>
    {pomodoros}
    </ul>
    </div>
  )
}

export default PomodoroDisplay;
