import React from 'react';


const Settings = props => {
    return(
      <div className="settings">
        <p
        style={props.isWorking && props.settingType == "Break-Length" ?
          {
            color: 'black'
          }
          : !props.isWorking && props.settingType == "Break-Length" ?
          {
            color: '#3ECFFF',
          }
          : props.isWorking && props.settingType == "Session-Length" ?
          {
            color: '#C0FF3E'
          }
          :
          {
            color: 'black'
          }
        }
        >
        {props.settingType}
        </p>
        <div>
        <button
          id={props.settingType}
          className="down"
          onClick={props.onClick}>
          <i className="fas fa-arrow-down fa-2x"></i>
        </button>
        <h3
          id={props.settingType}
        >
        {props.default}
        </h3>
        <button
          id={props.settingType}
          className="up"
          onClick={props.onClick}>
          <i className="fas fa-arrow-up fa-2x"></i>
        </button>
        </div>
      </div>
    )
  }

export default Settings;
