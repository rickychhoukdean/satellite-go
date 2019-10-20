import "./HomeCard.css"
import React, { useState, useEffect } from "react";
import Axios from "axios";
import FindCard from "../FindCard/FindCard";
import MessageCard from "../MessageCard/MessageCard";
import ControlledCarousel from "../Carousel/Carousel"
import useSatelliteInfo from '../../hooks/useSatelliteInfo';
import ProfileView from '../ProfileView';


export default function WelcomeCard() {

  const find = "find";
  const results = "results";
  const profile = "profile";
  const error = "error";
  const searching = "searching"

  // const [latlong, setlatlong] = useState({ lat: null, long: null });
  const [satellites, setSatellites] = useState([])
  const [view, setView] = useState("find");
  let errorMessage = ""
	const {
		satInfo,
		getWikiAllSatInfo
	} = useSatelliteInfo();

  // const getLocation = function () {
  //   //  view change to loading
  //   setView(searching);
  //   navigator.geolocation.getCurrentPosition(showPosition => {

  //     const lat = showPosition.coords.latitude;
  //     const long = showPosition.coords.longitude;
  //     Axios.get(
  //       `https://www.n2yo.com/rest/v1/satellite/above/${lat}/${long}/0/70/18/&apiKey=UAEV2J-66KU43-VZWHN7-47UW
  //       `
  //     ).then(res => {
  //       if (res.data.above.length === 0) {
  //         errorMessage = "There are no satellites in your location!";
  //         setView(error)
  //       }
  //       else {
  //         console.log(res.data.above)
  //         setSatellites(res.data.above)
  //         setView(results)
  //       }
  //     });
  //   });
  // };

  // <button onClick={() => getWikiAllSatInfo(["2", "28", "30", "7", "20"])}>TEST ALL COMBINED</button>	


  const setSearching = function(){
    setView(searching);
  }

  const setResult = function(){
    setView(results)
  }

  let display = "";
  switch (view) {
    case find:
      display = (<FindCard getLocation={()=>(getWikiAllSatInfo(["2", "28", "30", "7", "20"] , setSearching , setResult))} title="Find what satellites are around you" />)
      // display = (<FindCard getLocation={()=>(searchSatellites)} title="Find what satellites are around you" />)

      break;
    case results:
      display = <ControlledCarousel sats={satInfo} title="Search Results" />
      break;
    case profile:
      display = <ProfileView />
      break;
    case error:
      display = <MessageCard text={errorMessage} title="Error!" />
      break;
    case searching:
      display = <MessageCard text="searching" loading={true} />
      break;

    default:
      break;
  }

  const checkResults = () => {
    (satellites.length) ? setView(results) : setView(find);
  }

  return (
    <>
      <div id="home-card">

        {display}

        {/* Buttons for tab "navigation" */}
      </div>
      <div id="tab-buttons">
        <button className="search-button" onClick={checkResults}>Search</button>
        <button className="collection-button" onClick={() => { setView(profile)}}>Collection</button>
      </div>
    </>
  )
}

