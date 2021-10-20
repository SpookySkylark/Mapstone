import {Marker} from 'google-maps-react';

/* const MarkersComponent = ({jsonData}) => {
    return (
        <div>
            {jsonData.map( (pins, index) => <Marker title={pins.title} position={{lat: pins.position.lat, lng: pins.position.lang}} key={pins.id} {...pins} pinnum={index+1}/>)}
        </div>
        );
} */

const MarkersComponent = ({jsonData}) => {
    return (
        <div>
            {jsonData.map( (pins, index) => <Marker 

            position={{ 
                lat: 48.4622,
                lng: -123.293
            }} 

            key={pins.id} 

            {...pins} pinnum={index+1}/>)}
        </div>
        );
}

export default MarkersComponent;