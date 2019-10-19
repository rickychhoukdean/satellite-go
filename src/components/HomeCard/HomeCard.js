import "./HomeCard.css"
import React, { useState, useEffect } from "react";
import Axios from "axios";
import FindCard from "../FindCard/FindCard";
import ErrorCard from"../ErrorCard/ErrorCard";

export default function WelcomeCard() {

  const find = "find";
  const results = "results";
  const profile = "profile";
  const error = "error";

  // const [latlong, setlatlong] = useState({ lat: null, long: null });
  const [satellites, setSatellites] = useState([])
  const [view, setView] = useState("find");
  let  errorMessage =""

  const getLocation = function () {
    navigator.geolocation.getCurrentPosition(showPosition => {

      const lat = showPosition.coords.latitude;
      const long = showPosition.coords.longitude;
      Axios.get(
        `https://www.n2yo.com/rest/v1/satellite/above/${lat}/${long}/0/70/18/&apiKey=UAEV2J-66KU43-VZWHN7-47UW
        `
      ).then(res => {
        if (res.data.above.length === 0) {
          errorMessage = "There are no satellites in your location!";
          setView(error)
        }
        else {
          console.log(res.data.above)
          setSatellites(res.data.above)
          setView(results)
        }
      });
    });
  };

  let display = "";
  switch (view) {
    case find:
      display = <FindCard getLocation={getLocation} />
      break;
    case results:
      display = <ErrorCard text="this shows the cards" />
      break;
    case profile:
    display = <ErrorCard text="this shows the profile" />
      break;
    case error:
      display = <ErrorCard text={errorMessage} />
      break;

    default:
      break;
  }

  return (
    <>
      <div id="home-card">

        {display}

        {/* Buttons for tab "navigation" */}
      </div>
      <div id="tab-buttons">
        <button className="search-button" onClick={()=>{setView(find)}}>Search</button>
        <button className="collection-button" onClick={()=>{setView(profile)}}>Collection</button>
      </div>
    </>
  )
}

