import React, {useState, useRef} from 'react'
import Tooltip from 'react-bootstrap/Tooltip'
import Overlay from 'react-bootstrap/Overlay'


import './SatelliteCard.css';
import Axios from 'axios';

// API RESPONSE
// "above": [
//     {
//       "satid": 20480,
//       "satname": "JAS 1B (FUJI 2)",
//       "intDesignator": "1990-013C",
//       "launchDate": "1990-02-07",
//       "satlat": 49.5744,
//       "satlng": -96.7081,
//       "satalt": 1227.9326
//     },
//     {
//       "satid": 26609,
//       "satname": "AMSAT OSCAR 40",
//       "intDesignator": "2000-072B",
//       "launchDate": "2000-11-16",
//       "satlat": 5.5105,
//       "satlng": -21.4478,
//       "satalt": 49678.6389
//     },
//     {
//       "satid": 40719,
//       "satname": "DEORBITSAIL",
//       "intDesignator": "2015-032E",
//       "launchDate": "2015-07-10",
//       "satlat": 43.8106,
//       "satlng": -90.3944,
//       "satalt": 657.5516
//     }
//   ]



function SatelliteCard({sat, image, desc, addToFavourites }) {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (
        <div className="sat-card card_back">
            
            <div className='title'>
                <h4 className='sat_name' style={{ margin: 0 }}>{sat.satname}</h4>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <h6 style={{ margin: 0 }}>hp</h6>
                    {/* <h5 style={{ margin: 0 }}>{sat.satalt}</h5> */}
                </div>
            </div>
            <img src={image} className='image' />
            <p className='text'>
                {desc}
            </p>

            <button ref={target} style={{ borderRadius:100, backgroundColor: '#939393', width: 50, height: 50, position: 'absolute', bottom: 45, right: 20 }} onClick={e => {
                // addToFavourites(sat, desc)
                console.log('clicked')
                setShow(!show)
                
            }}>+</button>
             <Overlay target={target.current} show={show} placement="left">
        {props => (
          <Tooltip id="overlay-example" {...props}>
            Added to collection.
          </Tooltip>
        )}
      </Overlay>   
        </div>
    )
}

export default SatelliteCard
