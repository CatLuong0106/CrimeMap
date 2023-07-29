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
        updateDrawingMode(map, drawMode)
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


            setMap(newMap);
        })
    }

    const computeFeature = (feature) => {
        console.log("TODO: Optimize computeFeature to so that the feature state is not reset when not needed be")
        setFeatures(prevFeatures => prevFeatures.concat([feature]))
        return { visible: true }
    }

    const changeThemeColorOfAll = (newColor) => {
        for (const feature of features) {
            map.data.overrideStyle(feature, {
                fillColor: newColor,
                strokeColor: newColor,
            })
        }
    }

    const updateDrawingMode = (map, mode) => {
        if (!(map && map.data)) return
        switch (mode) {
            case "Point":
            case "LineString":
            case "Polygon": map.data.setDrawingMode(mode); break
            default: map.data.setDrawingMode(null); break
        }
    }

    return (
        <MapContext.Provider value={{ initMap, changeThemeColorOfAll, setDrawMode }}>
            {children}
        </MapContext.Provider>
    )
}