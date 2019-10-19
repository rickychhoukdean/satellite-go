import React, {useState, useRef} from 'react'
import Tooltip from 'react-bootstrap/Tooltip'
import Overlay from 'react-bootstrap/Overlay'


import '../styles/Card.scss';
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



function SatelliteCard({sat, image, desc, addToFavourites, card_style }) {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (
        <div className={card_style === "carousel" ? "card_back" : "card_collection"} style={{ borderColor: sat.bordColor }} >
            
            <div className='title'>
                <h5 className='sat_name' style={{ margin: 0 }}>{sat.satname}</h5>
                {card_style === "carousel" && 
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <span style={{ margin: 0 }}>alt </span>
                    <span style={{ margin: 0, fontSize: '1.2rem' }}>{parseInt(sat.satalt)}</span>
                </div>
                }
            </div>
            <img src={image} className='image' />
            {card_style === "carousel" && 
            <div>
                <p className='text'>
                    latitude: {sat.satlat}
                </p>
                <p className='text'>
                    longitude: {sat.satlng}
                </p>
                <p className='text'>
                    launch date: {sat.launchDate}
                </p>
                <p className='text'>
                    {desc}
                </p>
            </div>
            }

            {card_style === 'carousel' &&
            <div>
            <button ref={target} style={{ borderRadius:100, backgroundColor: '#939393', width: 45, height: 45, position: 'absolute', bottom: 45, right: 20, borderWidth: 0 }} onClick={e => {
                addToFavourites(sat, desc)
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
            } 
        </div>
    )
}

export default SatelliteCard
