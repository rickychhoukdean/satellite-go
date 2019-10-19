import React, { useState , useEffect } from "react";
import logo from "./logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Axios from "axios";
import WelcomeCard from "./components/WelcomeCard/WelcomeCard";
import HomeCard from "./components/HomeCard/HomeCard"
import useSatelliteInfo from './hooks/useSatelliteInfo';


import ProfileView from './components/ProfileView';

function App() {
  const [latlong, setlatlong] = useState({ lat: null, long: null });
  const [sats, setSats] = useState([])
  const [view, setView] = useState("loading")

  const {
		satInfo,
		getWikiAllSatInfo
	} = useSatelliteInfo();

  let display="";

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




  // useEffect(() => {
  //   getSatellites()

  //   Axios.get('https://cors-anywhere.herokuapp.com/https://nasa-spaceapp-lhl.herokuapp.com/user/1/satellites').then(res => console.log("==> from get:",res))
  // }, [])

  // return (
  //   <div className="App">
  //     {/* <ControlledCarousel sats={sats} /> */}
  //     <ProfileView sats={sats} />
  
  
  useEffect(()=>{
    setView("loading")
    setTimeout(()=>{setView("home")},1000)

  }, [])

if(view==="loading"){
  display =  <WelcomeCard/>
}

else {
  
  display = <HomeCard/>
}


return (
  <div className="App">
	{/* <button onClick={() => getWikiAllSatInfo(["2", "28", "30", "7", "20"])}>TEST ALL COMBINED</button>	 */}
	{display}
  </div>
)

  
}

export default App;
