import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Axios from "axios";
import ControlledCarousel from "./components/Carousel"
import './styles/Card.scss'

import ProfileView from './components/ProfileView';

function App() {
  const [latlong, setlatlong] = useState({ lat: null, long: null });
  const [sats, setSats] = useState([])

  const bordColors = (cat) => {
    switch (cat) {
      case "Amateur radio":
        return "#20BF55"
      case "ISS":
        return "#0B4F6C"
      case "Engineering":
        return "#310A31"
      case "Military":
        return "#A7CAB1"
      case "Search and Rescue":
        return "#EC0B43"
      case "GPS":
        return "#FFF689"
      default:
        break;
    }
  }

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
      `https://www.n2yo.com/rest/v1/satellite/above/${latlong.lat}/${latlong.long}/0/70/18/&apiKey=ZX8QFR-KLNRJE-E2TUHW-47VJ
      `
    ).then(res => {
      console.log(res);
      const satResults = res.data.above.map(data => {
        const sat = {...data};
        sat.bordColor = bordColors(res.data.info.category);
        return sat;
      });
      setSats(satResults)
      console.log("==|==|> satResults:",satResults)
    });
  };

  useEffect(() => {
    getSatellites()

    Axios.get('https://cors-anywhere.herokuapp.com/https://nasa-spaceapp-lhl.herokuapp.com/user/1/satellites').then(res => console.log("==> from get:",res))
  }, [])

  return (
    <div className="App">
      {/* <ControlledCarousel sats={sats} /> */}
      <ProfileView sats={sats} />

      
    </div>
  );
}

export default App;
