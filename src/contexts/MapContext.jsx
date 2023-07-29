import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect, useState, useContext } from "react";
import data from '../assets/clifton';

export const MapContext = React.createContext();
export const useMap = () => useContext(MapContext)

export const addGeometry = (type, map, coords) => {
    return map.data.add({ geometry: new google.maps.Data[type](coords) })  
}

export const addAdvancedMarker = (marker, map, coords, content) => {
    return new marker({
        map: map,
        position: coords,
        content: (() => {
            const el = document.createElement('div')
            el.classList.add('map-marker')
            el.innerText = content
            return el
        })()
    })
}

export const MapProvider = ({ children }) => {
    // Map info
    const center = ({ lat: 39.15, lng: -84.52 })
    const zoom = 13;
    const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY || process.env.VITE_GOOGLE_MAP_API_KEY;
    const mapId = import.meta.env.VITE_GOOGLE_MAP_ID || process.env.VITE_GOOGLE_MAP_ID;
    const version = "weekly"
    const geojsons = [];

    const [features, setFeatures] = useState([]);
    const [drawMode, setDrawMode] = useState(null);
    const [map, setMap] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [fetchData, setFetchData] = useState(null);

    useEffect(() => {
        const fetchCincyCrimeData = async () => {
            try {
                const response = await fetch('https://data.cincinnati-oh.gov/resource/k59e-2pvf.json');
                const jsonData = await response.json();
                setFetchData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCincyCrimeData()
    }, [])

    useEffect(() => {
        if (!fetchData || !map || loaded || 1 == 1) { return }
        for (const point of fetchData) {
            addGeometry('Point', map, {
                lat: parseFloat(point['latitude_x']),
                lng: parseFloat(point['longitude_x']),
            })
        }
        setLoaded(true)

    }, [fetchData, map])

    useEffect(() => {
        updateDrawingMode(map, drawMode)
    }, [drawMode])

    const initMap = () => {
        console.log("Initiating map")
        const loader = new Loader({ apiKey, version })
        let newMap;
        loader.load().then(async () => {
            const { Map } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")
            
            newMap = new Map(document.getElementById("map"), { center, zoom, mapId });
            addAdvancedMarker(AdvancedMarkerElement, newMap, { lat: 39.15, lng: -84.52 }, 'CLIFTON')
            
            for (const geojson of geojsons) { newMap.data.loadGeoJson(geojson) }
            for (const feature of data.features) {

                let geometry = feature['geometry']
                let type = geometry['type']
                let coords = geometry['coordinates']
                let newCoords;

                switch (type) {
                    case 'Point':
                        newCoords = { lat: coords[1], lng: coords[0] }
                        break
                    case 'LineString':
                        newCoords = coords.map(c => ({ lat: c[1], lng: c[0] }))
                        break
                    case 'Polygon':
                        newCoords = coords.map(c => c.map((path) => ({ lat: path[1], lng: path[0] })))
                        break
                }
                if (newCoords) addGeometry(type, newMap, newCoords)
            }

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