import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";

function App() {
  const [latlong, setlatlong] = useState({ lat: null, long: null });

  //This is how you get current lat / long
  const getLocation = function() {
    navigator.geolocation.getCurrentPosition(showPosition => {
      setlatlong({
        ...latlong,
        lat: showPosition.coords.latitude,
        long: showPosition.coords.longitude
      });
      console.log(showPosition.coords.latitude);
      console.log(showPosition.coords.longitude);
    });
  };

  const getImage = function() {
  };

  const getSatellites = function() {
    Axios.get(
      `https://www.n2yo.com/rest/v1/satellite/above/${latlong.lat}/${latlong.long}/0/70/18/&apiKey=UAEV2J-66KU43-VZWHN7-47UW
      `
    ).then(res => {
      console.log(res);
      // res.data.above.map(data => {});
    });
  };

  return (
    <div className="App">
      <div onClick={getLocation}>CLICK</div>
      <div onClick={getSatellites}>test</div>
      <div onClick={getImage}>test2</div>
    </div>
  );
}

export default App;
