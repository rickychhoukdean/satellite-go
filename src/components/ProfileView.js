import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap'
import "../styles/Card.scss"
import "../styles/Profile.scss"
import SatelliteCard from "./SatelliteCard"


const ProfileView = ({sats}) => {
  const [favourites, setFavourites] = useState([]);


  return (
    <div className="flexContainer">
      {sats.map(sat => {
        return (
            <SatelliteCard 
              key={sat.satid}
              sat={sat}
              image='https://waterfm.com/wp-content/uploads/satellite-in-space.jpg' 
              desc={`Id: ${sat.satid}\nlatitude: ${sat.satlat}\nlongitude: ${sat.satlng}\nlaunch date: ${sat.launchDate}`}
              card_style="collection"
            />
        )
      })}
    </div>
    
  )
}

export default ProfileView;