import React from 'react';


const Settings = props => {
    return(
      <div className="settings">
        <p>{props.settingType}</p>
        <div>
        <button
          id={props.settingType}
          className="down"
          onClick={props.onClick}>
          <i className="fas fa-arrow-down"></i>
        </button>
        <input
          type="number"
          id={props.settingType}
          value={props.default}
          onChange={props.onChange}>
        </input>
        <button
          id={props.settingType}
          className="up"
          onClick={props.onClick}>
          <i className="fas fa-arrow-up"></i>
        </button>
        </div>
      </div>
    )
  }

export default Settings;
