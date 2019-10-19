import "./HomeCard.css"
import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function WelcomeCard() {

  const [latlong, setlatlong] = useState({ lat: null, long: null });
  const [satellites, setSatellites] = useState([])
  //This is how you get current lat / long

  const getLocation = function () {
    navigator.geolocation.getCurrentPosition(showPosition => {

      const lat = showPosition.coords.latitude;
      const long = showPosition.coords.longitude;

      Axios.get(
        `https://www.n2yo.com/rest/v1/satellite/above/${lat}/${long}/0/70/18/&apiKey=UAEV2J-66KU43-VZWHN7-47UW
        `
      ).then(res => {
        console.log(res.data.above);
        setSatellites(res.data.above)
      });
    });
  };

  const getImage = function () {
  };

  return (
    <div>
      <button className="find-button" onClick={getLocation}>Find</button>
      <button className="search-button">Search</button>
      <button className="collection-button">Collection</button>
    </div>
  )
}

