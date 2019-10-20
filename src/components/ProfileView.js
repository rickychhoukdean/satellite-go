import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap'
import "./SatelliteCard/SatelliteCard.scss"
import "./SatelliteCard/Profile.scss"
import SatelliteCard from "./SatelliteCard/SatelliteCard"


const ProfileView = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    Axios.get('https://cors-anywhere.herokuapp.com/https://nasa-spaceapp-lhl.herokuapp.com/user/1/satellites')
    .then(res => {
      console.log("==|==|> res from get:",res)
      setFavourites(res.data)
    })
  }, [])

  return (
    <div className="flexContainer">
      {favourites && favourites.map(sat => {
        sat.satname = sat.name
        return (
            <SatelliteCard 
              key={sat.id}
              sat={sat}
              image={sat.imageUrl === "dummy data" 
                ? 'https://waterfm.com/wp-content/uploads/satellite-in-space.jpg' 
                : sat.imageUrl } 
              desc={`Id: ${sat.satid}\nlatitude: ${sat.satlat}\nlongitude: ${sat.satlng}\nlaunch date: ${sat.launchDate}`}
              card_style="collection"
            />
        )
      })}
    </div>
    
  )
}

export default ProfileView;