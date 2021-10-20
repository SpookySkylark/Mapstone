
import {React, useState, useRef } from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
//import MarkersComponent from './MarkersComponent';

  const center = {
    lat: 48.4622,
    lng: -123.293
  };


function MapDisplay({google, jsonData}) {
  const [ activeMarker, setActiveMarker] = useState({});
  const [ showInfoWindow, setShowInfoWindow] = useState(false);
  const markerOnClick = (props, marker, e) => {
    //console.log(marker);
    setActiveMarker(marker);
    setShowInfoWindow(true);
  };
  return (
    <Map
      google={google}
      zoom={12}
      initialCenter={center}
    >
      {jsonData.map( (pins) => <Marker title={pins.title} description={pins.description} position={{lat: pins.position.lat, lng: pins.position.lng}} key={pins.id}
        onClick={markerOnClick}
      >
      </Marker>)}
      
      <InfoWindow
        marker={activeMarker}
        visible={true}
        >
        <div>
            <h4>{activeMarker.title}</h4>
            <p>{activeMarker.description}</p>
        </div>
        </InfoWindow>
    </Map>
  );
}
   
export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API
})(MapDisplay);

