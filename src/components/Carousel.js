import Carousel from 'react-bootstrap/Carousel';
import React, { useState } from "react";
import SatelliteCard from "./SatelliteCard";
import axios from 'axios';



function ControlledCarousel({sats}) {
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
    <Carousel activeIndex={index} direction={direction} onSelect={handleSelect} interval={null}>
      {sats.map(sat => {
        return (
          <Carousel.Item>
            <SatelliteCard 
              key={sat.satid}
              sat={sat}
              image='https://waterfm.com/wp-content/uploads/satellite-in-space.jpg' 
              desc={"latitude: " + sat.satlat + "\nlongitude: " + sat.satlng + "\nlaunch date: " + sat.launchDate}
              addToFavourites={addToFavourites}
              card_style="carousel"
            />
            
          </Carousel.Item>
        )
      })}
      <Carousel.Item>
      <SatelliteCard 
        sat={{
          satname:'5u93R-Probe',
          satalt:'500'
        }}
        launchDate=''  
        image='https://waterfm.com/wp-content/uploads/satellite-in-space.jpg' 
        desc="In the context of spaceflight, a satellite is an object that has been intentionally placed into orbit. These objects are called artificial satellites to distinguish them from natural satellites such as Earth's Moon." 
      />
       
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
