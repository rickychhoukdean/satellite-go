import { useState } from "react";
import Axios from "axios";

const useSatelliteInfo = () => {
  const [satInfo, setSatInfo] = useState([]);

  const getSatellites = function(lat, long, categoryId) {
    return Axios.get(
      `https://www.n2yo.com/rest/v1/satellite/above/${lat}/${long}/0/70/${categoryId}/&apiKey=UAEV2J-66KU43-VZWHN7-47UW
      `
    ).then(res => {
      return res.data.above;
    });
  };

  //intDesignator is one of the parameters in the satellite api call.
  const getWikiSearch = function(satName, intDesignator) {
    let url = "https://en.wikipedia.org/w/api.php";

    const params = {
      action: "query",
      list: "search",
      srsearch: `${satName} ${intDesignator}`,
      format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key) {
      url += "&" + key + "=" + params[key];
    });

    return Axios.get(url)
      .then(function(response) {
        const checkTitle = satName.split(" ");
        if (
          response.data.query.search[0] &&
          response.data.query.search[0].title.includes(checkTitle[0])
        ) {
          const title = response.data.query.search[0].title;
          return title;
        } else {
          return "";
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const getWikiSatDesc = wikiTitle => {
    const temp = wikiTitle.replace(/ /g, "%20");
    const url = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&titles=${temp}`;

    return Axios.get(url)
      .then(response => {
        const wikiText =
          response.data.query.pages[Object.keys(response.data.query.pages)[0]]
            .extract;

        return wikiText;
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const getWikiSatImg = wikiTitle => {
    const temp = wikiTitle.replace(/ /g, "%20");
    const url = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=pageimages&extract&exintro&explaintext&titles=${temp}&pithumbsize=400`;

    return Axios.get(url)
      .then(response => {
        const imageUrl = response.data.query.pages[
          Object.keys(response.data.query.pages)[0]
        ].thumbnail
          ? response.data.query.pages[Object.keys(response.data.query.pages)[0]]
              .thumbnail.source
          : "dummy data";

        return imageUrl;
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const getWikiSatInfo = (satName, intDesignator) => {
    return getWikiSearch(satName, intDesignator).then(title => {
      if (title) {
        Promise.all([getWikiSatDesc(title), getWikiSatImg(title)]).then(
          values => {
            // console.log(intDesignator)



            setSatInfo(prev => {
              return [
                ...prev,
                {
                  name: satName,
                  description: values[0],
                  imageUrl: values[1]
                }
              ];
            });
          }
        );
      }
    });
  };

  const getWikiAllSatInfo = (categoryIds, setSearching, setResult) => {
    setSearching();
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(showPosition => {
        resolve({
          lat: showPosition.coords.latitude,
          long: showPosition.coords.longitude
        });
      });
    }).then(coords => {
      Promise.all([
        getSatellites(coords.lat, coords.long, "2"),
        getSatellites(coords.lat, coords.long, "28"),
        getSatellites(coords.lat, coords.long, "30"),
        getSatellites(coords.lat, coords.long, "7"),
        getSatellites(coords.lat, coords.long, "20")
      ]).then(async satellites => {
        const flatSatellites = satellites.flat();
        console.log("satellites found", flatSatellites);
        const test = await flatSatellites.map(async satellite => {
          if (satellite) {
            await getWikiSatInfo(satellite.satname, satellite.intDesignator);
          }
        });
        setResult()
      });
    });
  };

  return {
    satInfo,
    getWikiAllSatInfo
  };
};

export default useSatelliteInfo;
