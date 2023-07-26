import { useMap } from '../contexts/MapContext';
import { useEffect } from 'react';

const GoogleMap = () => {
    const { initMap } = useMap();

    useEffect(() => {
        initMap()
    }, [])


    return <div id="map"></div>
}

export default GoogleMap;
