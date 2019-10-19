import Carousel from 'react-bootstrap/Carousel';
import React, { useState } from "react";
import SatelliteCard from "./SatelliteCard";
import CarouselItem from 'react-bootstrap/CarouselItem';



function ControlledCarousel({sats}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    setDirection(e.direction);
  };

  return (
    <Carousel activeIndex={index} direction={direction} onSelect={handleSelect} interval={null}>
      {sats.map(sat => {
        return (
          <Carousel.Item>
            <SatelliteCard 
              key={sat.satid}
              satName={sat.satname} 
              launchDate='' altitude={sat.satalt}
              image='https://waterfm.com/wp-content/uploads/satellite-in-space.jpg' 
              desc={`Id: ${sat.satid}\nlatitude: ${sat.satlat}\nlongitude: ${sat.satlng}\nlaunch date: ${sat.launchDate}`}
            />
            
          </Carousel.Item>
        )
      })}
      <Carousel.Item>
      <SatelliteCard 
        satName='5u93R-Probe' 
        launchDate='' altitude='500' 
        image='https://waterfm.com/wp-content/uploads/satellite-in-space.jpg' 
        desc="In the context of spaceflight, a satellite is an object that has been intentionally placed into orbit. These objects are called artificial satellites to distinguish them from natural satellites such as Earth's Moon." 
      />
       
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
