import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import useSatelliteInfo from './hooks/useSatelliteInfo';

function App() {
	const {
		satInfo,
		getWikiAllSatInfo
	} = useSatelliteInfo();

  return (
    <div className="App">
            <button onClick={() => getWikiAllSatInfo(["2", "28", "30", "7", "20"])}>TEST ALL COMBINED</button>
    </div>
  );
}

export default App;
