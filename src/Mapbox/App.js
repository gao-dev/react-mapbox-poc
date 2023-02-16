import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import * as parkData from '../data/skateboard-parks.json';

import './app.css';

function App() {

  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: '100vw', // here I can use css
    height: '100vh', // here I can use css
    zoom: 10,
  });

  const [ selectedPark, setSelectedPark ] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if(e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };

  }, []);

  return (
    <div className="App">
      <ReactMapGL 
        {...viewport} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle={process.env.REACT_APP_MAPBOX_STYLE_URL}
        onViewportChange={_viewport => {
          setViewport(_viewport);
        }}
        >
          {
            parkData.features.map((park) => {
              return (
                <Marker 
                  key={park.properties.PARK_ID} 
                  latitude={park.geometry.coordinates[1]}
                  longitude={park.geometry.coordinates[0]}
                  >
                  <button class="marker-btn" onClick={ e => {
                    e.preventDefault();
                    setSelectedPark(park);
                  }}>
                    <img src="/skateboarding.svg" alt="Skate Park Icon" />
                  </button>
                </Marker>
              )
            })
          }
          { 
            selectedPark && 
            <Popup 
                  latitude={selectedPark.geometry.coordinates[1]} 
                  longitude={selectedPark.geometry.coordinates[0]}
                  onClose={() => setSelectedPark(null)}
            >
              <div>
                <h2>{selectedPark.properties.NAME}</h2>
                <p>{selectedPark.properties.DESCRIPTIO}</p>
              </div>
            </Popup>
          }
      </ReactMapGL>
    </div>
  );
}

export default App;
