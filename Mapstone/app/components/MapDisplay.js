
import {React, useState, useRef } from 'react';
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
//import MarkersComponent from './MarkersComponent';

  const center = {
    lat: 48.4622,
    lng: -123.293
  };

/*   const MapDisplay = ({jsonData}) => {
    return (
        <GoogleApiWrapper
          bootstrapURLKeys={{ key: "AIzaSyDpuqEzY_XBZV-9id3QI4BMnr2flj5Bdt0"}}
          google={this.props.google}
          mapContainerStyle={containerStyle}
          defaultCenter ={center}
          yesIWantToUseGoogleMapApiInternals
          defaultZoom ={12}
        >

        </GoogleApiWrapper>

    )
  }; */ 

//export default MapDisplay;
  
  
/* export class MapDisplay extends Component {
  
  render() {
    return (
    <div>
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={
          {
            lat: 48.4622,
            lng: -123.293
          }
        }
      >

    </Map>
  </div>
    );
  }
}*/


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

/* const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
) */
//{renderInfoWindow(pins)}

/* const renderInfoWindow = (marker) => {
  if(activeMarker == marker) {
    console.log(marker);
    return (<InfoWindow
      position={marker.position}
      visible={true}
      ><div>
          <h1>{marker.title}</h1>
          {marker.description}
        </div>
      </InfoWindow>);
  } else {
    return '';
  }
}; */