import React, { useState , useEffect } from "react";
import logo from "./logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Axios from "axios";
import WelcomeCard from "./components/WelcomeCard/WelcomeCard";
import HomeCard from "./components/HomeCard/HomeCard"
import useSatelliteInfo from './hooks/useSatelliteInfo';



function App() {
	const [view, setView] = useState("loading")
	
	const {
		satInfo,
		getWikiAllSatInfo
	} = useSatelliteInfo();

  let display="";

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
	<button onClick={() => getWikiAllSatInfo(["2", "28", "30", "7", "20"])}>TEST ALL COMBINED</button>	
	{display}
  </div>
)

  
}

export default App;
