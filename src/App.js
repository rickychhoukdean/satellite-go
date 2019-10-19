import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";

function App() {
	//hook that will store current user geolocation
	const [latlong, setlatlong] = useState({ lat: null, long: null });

	//Function that will set users geolocation
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
	const getSatellites = function() {
		Axios.get(
			`https://www.n2yo.com/rest/v1/satellite/above/${latlong.lat}/${latlong.long}/0/70/18/&apiKey=UAEV2J-66KU43-VZWHN7-47UW
      `
		).then(res => {
			console.log(res);
			// res.data.above.map(data => {});
		});
	};

	//intDesignator is one of the parameters in the satellite api call.
	const getWikiSearch = function(satName, intDesignator) {
		var url = "https://en.wikipedia.org/w/api.php";

		var params = {
			action: "query",
			list: "search",
			srsearch: "SAUDISAT 1C",
			format: "json"
		};

		url = url + "?origin=*";
		Object.keys(params).forEach(function(key) {
			url += "&" + key + "=" + params[key];
		});

		Axios.get(url)

			.then(function(response) {
				console.log(response.data.query.search[0]);
				return response.data.query.search[0];
			})
			.catch(function(error) {
				console.log(error);
			});
	};
	const getWikiSatDesc = wikiTitle => {
		let temp = wikiTitle.replace(/ /g, "%20");
		var url = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&titles=${temp}`;


		Axios.get(url)
			.then(response => {
				console.log(response);
				return response;
			})

			.catch(function(error) {
				console.log(error);
			});
  };
  const getWikiSatImg = wikiTitle =>{

  }


  const get
	return (
		<div className="App">
			<button>
				<h1 onClick={getLocation}>CLICK</h1>
			</button>
			<button>
				<h1 onClick={getSatellites}>test</h1>
			</button>
			<button>
				<h1 onClick={getWikiSearch}>wiki API test</h1>
			</button>
			<button>
				<h1
					onClick={() => {
						getWikiSatDesc("mike Tyson");
					}}>
					wiki TITLE SEARCH test
				</h1>
			</button>
		</div>
	);

}

export default App;
