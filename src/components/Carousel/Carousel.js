import Carousel from 'react-bootstrap/Carousel';
import React, { useState } from "react";
import SatelliteCard from "../SatelliteCard/SatelliteCard";
import axios from 'axios';
import Title from "../Title/Title"



function ControlledCarousel({sats , title}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [respMsg, setResMsg] = useState('')

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };
  
  const addToFavourites = (sat, desc) => {
    console.log("==|==|> adding",sat.satid,"to favourites!")

    axios.post('https://cors-anywhere.herokuapp.com/https://nasa-spaceapp-lhl.herokuapp.com/user/1/satellites?name='+sat.satname+'&year_launched='+sat.launchDate+'&sat_id='+sat.satid+'&description='+desc, {
      params: {
        sat_id: sat.satid,
        name: sat.satname,
        description: desc,
        year_launched: sat.launchDate
      }
    })
    .then(res => {
      console.log(res)
      setResMsg(res)
    })
  } 

  return (
    <div className="carousel-container">
      {/* <Title title={title} /> */}
    <div className="carousel-description"> There are {sats.length} satellites in the area! </div>
    <Carousel activeIndex={index} direction={direction} onSelect={handleSelect} interval={null}>
      {console.log(sats)}
      {sats.map(sat => {
        return (
          <Carousel.Item key={sat.satid}>
            <SatelliteCard 
              // key={sat.satid}
              sat={sat}
              image='https://waterfm.com/wp-content/uploads/satellite-in-space.jpg' 
              desc={"latitude: " + sat.satlat + "\nlongitude: " + sat.satlng + "\nlaunch date: " + sat.launchDate}
              addToFavourites={addToFavourites}
              card_style="carousel"
            />
            
          </Carousel.Item>
        )
      })}
    </Carousel>
    </div>
  );
}

export default ControlledCarousel;
