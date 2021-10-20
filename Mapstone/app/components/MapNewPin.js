import {React, useState } from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
//import MarkersComponent from './MarkersComponent';

  const containerStyle = {
    width: '400px',
    height: '400px'
  };  

  const center = {
    lat: 48.4622,
    lng: -123.293
  };


function NewPinDisplay({google, applyClicked}) {
  const [tempMarker, setTempMarker] = useState(null);
  const makeTempMarker = (x, y) => {
    let marker = new Marker();
    marker.position = {lat: x, lng: y}
    setTempMarker(marker);
    
  }
  const renderTempMarker = () => {
    if(tempMarker) return <Marker position={{lat: tempMarker.position.lat, lng: tempMarker.position.lng}} key={10}></Marker>;
    else return '';
  }
  return (
    <Map
      google={google}
      zoom={12}
      initialCenter={center}
      onClick={(i, j, e) => {
        //console.log(e.latLng.lat());
        makeTempMarker(e.latLng.lat(), e.latLng.lng());
        applyClicked(e.latLng.lat(), e.latLng.lng());
      }}
    >
      {renderTempMarker()}
    </Map>
  );
}
   
export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API
  //apiKey: process.env.GOOGLE_API
})(NewPinDisplay);

/* const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
) */