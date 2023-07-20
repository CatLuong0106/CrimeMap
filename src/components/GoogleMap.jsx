import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useState } from 'react';


const GoogleMap = ({ mapThemeColor }) => {
    const [features, setFeatures] = useState([]);
    const [map, setMap] = useState(initMap);

    useEffect(() => {
        changeThemeColorOfAll(mapThemeColor);
    }, [mapThemeColor])

    function initMap()  {
        const center = { lat: 39.15, lng: -84.52 };
        const zoom = 14;
        const loader = new Loader({
            apiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
            version: "weekly",
        })
        
        let newMap;
        loader.load().then(async () => {
            const { Map } = await google.maps.importLibrary("maps");
            newMap = new Map(document.getElementById("map"), { center, zoom })
            newMap.data.loadGeoJson('clifton.geojson');
            newMap.data.setStyle(computeFeature)
            setMap(newMap);
        })
    }    

    function computeFeature(feature) {
        setFeatures(prevFeatures => prevFeatures.concat([feature]))
        let type = feature.j.split("/")[0]
        let visible = type != "node";
        return { visible }
    }

    function changeThemeColorOfAll(newColor) {
        console.log("Changing color of all map features")
        for (const feature of features) {
            map.data.overrideStyle(feature, {
                fillColor: newColor,
                strokeColor: newColor,
            })
        }
    }


    return <div id="map"></div>
}

export default GoogleMap;
