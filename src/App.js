import React, { useState , useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import WelcomeCard from "./components/WelcomeCard/WelcomeCard";
import HomeCard from "./components/HomeCard/HomeCard"

function App() {
  const [view, setView] = useState("loading")

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
  {display}
  </div>
)

  
}

export default App;
