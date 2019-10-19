import Carousel from 'react-bootstrap/Carousel';
import React, { useState } from "react";
import SatelliteCard from "./SatelliteCard";
import CarouselItem from 'react-bootstrap/CarouselItem';
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
    console.log("==|==|> adding",sat.satname,"to favourites!")
    axios.post('http://localhost:8000/user/1/satellites', {
        sat_id: sat.satid,
        name: sat.satname,
        description: desc,
        launch_year: sat.launchDate
    })
    .then(res => {
      setResMsg(res.message)
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
              desc={`Id: ${sat.satid}\nlatitude: ${sat.satlat}\nlongitude: ${sat.satlng}\nlaunch date: ${sat.launchDate}`}
              addToFavourites={addToFavourites}
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
