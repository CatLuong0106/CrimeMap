import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useState, useContext } from "react";
import configConsoleColor from '../utils/ConsoleColor';

configConsoleColor();

export const MapContext = React.createContext();
export const useMap = () => useContext(MapContext)

export const MapProvider = ({ children }) => {
    // Map info
    const center = { lat: 39.15, lng: -84.52 };
    const zoom = 14;
    const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
    const version = "weekly"
    const geojsons = ["clifton.geojson"];

    const [features, setFeatures] = useState([]);
    const [drawMode, setDrawMode] = useState(null);
    const [map, setMap] = useState(undefined)

    useEffect(() => {
        updateDrawingMode(drawMode)
    }, [drawMode])

    const initMap = () => {
        console.color("Initiating map", "yellow", "purple")
        const loader = new Loader({ apiKey, version })
        let newMap;
        loader.load().then(async () => {
            const { Map } = await google.maps.importLibrary("maps");
            newMap = new Map(document.getElementById("map"), { center, zoom });
            for (const geojson of geojsons) { newMap.data.loadGeoJson(geojson) }
            newMap.data.setStyle(computeFeature)

            newMap.addListener('click', (e) => {
                let lat = e.latLng.lat()
                let lng = e.latLng.lng()
                console.color(`Latitude: ${lat}`, 'yellow', 'purple')
                console.color(`Longitude: ${lng}`, 'yellow', 'purple')
            })
            
            newMap.data.addListener('click', (e) => {
                console.log(e.feature.getGeometry().getType())
                let lat = e.latLng.lat()
                let lng = e.latLng.lng()
                console.color(`Latitude: ${lat}`, 'yellow', 'purple')
                console.color(`Longitude: ${lng}`, 'yellow', 'purple')
            })

            setMap(newMap);
        })
    }

    const computeFeature = (feature) => {
        console.color("Computing features", "yellow", "purple")
        setFeatures(prevFeatures => prevFeatures.concat([feature]))
        // let type = feature.j.split("/")[0]
        // let visible = type != "node";
        // return { visible };
    }

    const changeThemeColorOfAll = (newColor) => {
        console.color("Changing all theme color", 'yellow', 'purple');
        for (const feature of features) {
            map.data.overrideStyle(feature, {
                fillColor: newColor,
                strokeColor: newColor,
            })
        }
    }

    const updateDrawingMode = (mode) => {
        console.color("Updating drawing mode", 'yellow', 'purple')
        if (mode != "Point" && mode != "LineString" && mode != "Polygon") mode = null
        if (map && map.data) map.data.setDrawingMode(mode);
    }

    return (
        <MapContext.Provider value={{ initMap, changeThemeColorOfAll, setDrawMode }}>
            {children}
        </MapContext.Provider>
    )
}