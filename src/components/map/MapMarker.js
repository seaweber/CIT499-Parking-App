import React, { useEffect } from 'react';

function MapMarker ( props ) {

    const styles = {

        borderRadius: '50%',
        backgroundColor: props.inside ? 'green' : 'red',
        width: '15px',
        height: '15px'

    };

    useEffect( () => {

        props.isInside( props.name, props.inside );

    }, [ props.inside ]);

    return (
        <div style={ styles }/>
    );

}

export default MapMarker;
