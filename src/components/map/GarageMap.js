import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

import { usePosition } from '../../hooks/UsePosition';
import MapMarker from './MapMarker';
import { Geofence } from './Geofence';
import InfoBox from './InfoBox';

function GarageMap () {

    const [ filter, toggleFilter ] = useState( false );

    // Name of garage the user is currently inside of
    const [ insideGarage, setInsideGarage ] = useState( { } );

    const position = usePosition();

    const iupuiCoords = [ 39.7751777, -86.1777634 ];

    const [ location, setLocation ] = useState( iupuiCoords );

    const mapMarkerCoords = {

        gatewayGarageCoords: [ 39.7756446, -86.1716292 ],

        lockefieldGarageCoords: [ 39.7791099, -86.1777814 ],

        blackfordGarageCoords: [ 39.7756797, -86.1723381 ],

        barnhillGarageCoords: [ 39.7729577, -86.1806792 ],

        sportsGarageCoords: [ 39.7707059, -86.1767232 ],

        riverwalkGarageCoords: [ 39.7698429, -86.1753227 ]
    };

    // Convert mapMarkerCoords values in array with Object.entries so that filter() can be applied
    // Then convert the result of filter() back into an object
    const filteredMapMarkerCoords = Object.fromEntries(Object.entries(mapMarkerCoords).filter( entry => {

        if (filter) {
          return (entry[0] === 'gatewayGarageCoords' || entry[0] === 'blackfordGarageCoords');
        } else return true;
    }));

    const isInsideAGarage = ( name, inside ) => {

        setInsideGarage( { ...insideGarage, [ name ]: inside } )
    };

    const camelToName = (camelCase) => camelCase
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase());

    const mapMarkers = Object.entries(filteredMapMarkerCoords).map( ( [ name, [ lat, long ]] ) => {

        const geofence = new Geofence( lat, long, .0001);

        return <MapMarker
                    lat={ lat }
                    lng={ long }
                    name={ camelToName( name ) }
                    inside={ geofence.inside( position.latitude, position.longitude ) }
                    isInside={ isInsideAGarage }
                />
    });

    const infoBox = Object.entries( insideGarage ).map( ([ name, inside]) => {

        if ( inside ) {
            const lastIndex = name.lastIndexOf( ' ' );
            const garageName = name.substring(0, lastIndex);
            return <InfoBox name={ garageName }/>;
        }
    });

    const handleFilterToggle = event => {
        toggleFilter( event.target.checked )
    };

    const teleport = garage => {

        setLocation( mapMarkerCoords[ garage ] );
    };

    return (

        <div style={ { height: '600px', width: '600px', margin: 'auto' } }>

            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyACXJmIcEM0BKdZT4NMtzuJfPwL2po52sU' }}
                center={ location }
                defaultZoom={ 14 }
            >
                { mapMarkers }

            </GoogleMapReact>
            <br/>
            <button onClick={ () => teleport('gatewayGarageCoords') }>Gateway</button>
            <button onClick={ () => teleport('lockefieldGarageCoords') }>Lockefield</button>
            <button onClick={ () => teleport('blackfordGarageCoords') }>Blackford</button>
            <button onClick={ () => teleport('barnhillGarageCoords') }>Barnhill</button>
            <button onClick={ () => teleport('sportsGarageCoords') }>Natatorium</button>
            <button onClick={ () => teleport('riverwalkGarageCoords') }>Riverwalk</button>
            <br/>
            <br/>
            <input type="checkbox" onClick={  event => handleFilterToggle( event ) } id="filter" name="filter" value="filter"/>
            <label for="filter">Filter by IT/ET</label>
            <br/>
            <br/>
            { infoBox }

        </div>
    );
}

export default GarageMap;
