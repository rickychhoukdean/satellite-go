import React from 'react'
import logo from '../../satellite.png'
import "./WelcomeCard.css"

export default function WelcomeCard() {

  return (
    <div>
      <img className="logo-welcome" src={logo} alt="Satellite logo"/>
      <h1 id="welcome-title"> Satellit </h1>
      
      {/* Add margin to top of the loading container */}
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  )
}

