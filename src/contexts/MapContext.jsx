import React, { useState, useContext, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { addGeometry, addAdvancedMarker, addMarker, addInfoWindow } from "../utils/MapTools";
import { baseStyle, hoveredStyle, selectedStyle } from "../utils/PolygonStyle";
import { enableClass, disableClass } from "../utils/DOMManipulation";
import { fetchAllPolygons } from "../utils/Area";
import { fetchCrimeScores, fetchDataPoints, fetchTotalOffenses, fetchOffensesByArea } from "../utils/BackendData";
import { mapStyle } from "../utils/MapStyle";

export const MapContext = React.createContext();
export const useMap = () => useContext(MapContext)

export const MapProvider = ({ children }) => {
    // MAP INFO
    const center = ({ lat: 39.14, lng: -84.51 })
    const zoom = 13;
    const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY || process.env.VITE_GOOGLE_MAP_API_KEY;
    const mapId = 'f8e45468a0959e80' || 'DEMO_MAP_ID' || import.meta.env.VITE_GOOGLE_MAP_ID || process.env.VITE_GOOGLE_MAP_ID || "DEMO_MAP_ID";
    const version = "weekly"

    // STATES
    const [mapFeatures, setMapFeatures] = useState([]);
    const [map, setMap] = useState(null);
    const [dashboardData, setDashboardData] = useState('');
    const [currentArea, setCurrentArea] = useState('');
    const [heatmap, setHeatmap] = useState(null);
    const [dashboardDataByArea, setDashboardDataByArea] = useState({ '': { crimeScore: 0, offenses: {} } })

    useEffect(() => {
        console.log(dashboardDataByArea, currentArea)
        setDashboardData(dashboardDataByArea[currentArea])
    }, [currentArea])

    // FUNC TO EXPORT MAP,  
    const initMap = () => {
        const loader = new Loader({ apiKey, version, libraries: ['visualization'] })

        loader.load().then(async () => {
            console.log(center.lat + 0.2)
            // CREATE MAP
            const newMap = await new google.maps.Map(document.getElementById("map"), {
                center, zoom, styles: mapStyle,
                minZoom: zoom - 3,
                maxZoom: zoom + 3,
                restriction: {
                    latLngBounds: {
                        north: center.lat + 0.05,
                        south: center.lat - 0.05,
                        east: center.lng + 0.05,
                        west: center.lng - 0.05,
                    },
                },
            });

            setMap(newMap);

            // ADD FEATURES TO MAP AND SAVE THEIR IDS FOR QUERYING
            const mapFeaturesToAdd = []
            let polygons = localStorage.getItem('polygons')
            polygons = polygons ? JSON.parse(polygons) : await fetchAllPolygons()
            const crimeScores = await fetchCrimeScores()
            const offensesByArea = await fetchOffensesByArea()

            for (const polygon of Object.values(polygons)) {

                const centerCoords = polygon.properties.center.geometry.coordinates
                const polygonName = polygon.properties.name
                const markerContent = `
                <div class='marker-crime-score'>${crimeScores[polygonName].toFixed()}</div>
                ${polygonName} ↗
                `
                const infoWindow = await addInfoWindow(null, { lat: centerCoords[1], lng: centerCoords[0] }, markerContent)

                dashboardDataByArea[polygonName] = {
                    name: polygonName,
                    crimeScore: crimeScores[polygonName],
                    offenses: offensesByArea[polygonName]
                }

                infoWindow.content.addEventListener('click', (e) => {
                    enableClass('#dashboard', 'half-view')
                    setCurrentArea(polygonName)
                    for (const mapFeature of mapFeaturesToAdd) {
                        const { marker } = mapFeature
                        marker.close()
                    }
                })

                const coords = polygon['geometry']['coordinates']
                coords[0] = coords[0].map(c => ({ lat: c[1], lng: c[0] }))
                let polygonFeature = await addGeometry("Polygon", polygon['id'], newMap, coords, polygon.properties)

                const mapFeature = {
                    id: polygonFeature.getId(),
                    feature: polygonFeature,
                    name: polygonName,
                    marker: infoWindow,
                }

                mapFeaturesToAdd.push(mapFeature)

            }

            const data_points = await fetchDataPoints()
            const heatmap_data = []

            for (const data_point of data_points) {
                const lat = data_point.latitude_x
                const lng = data_point.longitude_x
                heatmap_data.push(new google.maps.LatLng(lat, lng),)
            }

            const hm = await new google.maps.visualization.HeatmapLayer({
                data: heatmap_data,
                map: newMap,
                opacity: 1,
            });

            setHeatmap(hm)
            setMapFeatures(mapFeaturesToAdd)

            // SET STYLE BASED ON SELECTION STATE
            newMap.data.setStyle((feature) => {
                console.log('set style')
                let isSelected = feature.getProperty('selected')
                return isSelected ? selectedStyle : baseStyle
            })

            // EVENT LISTENERS
            newMap.data.addListener('click', (e) => {
                newMap.data.revertStyle()
                
                for (const { id, marker } of mapFeaturesToAdd) {
                    console.log(e.feature.getId(), id)
                    if (id == e.feature.getId()) {
                        e.feature.setProperty('selected', true)
                        
                        marker.open({ map: newMap })
                        const windowContainer = marker.content.parentNode.parentNode
                        const windowContainerArrow = windowContainer.nextSibling
                        windowContainer.style.animation = 'fade-in 0.5s 1 forwards'
                        windowContainerArrow.style.display = 'none'
                    } else {
                        console.log('false')
                        newMap.data.getFeatureById(id).setProperty('selected', false)
                        marker.close()
                    }
                }
            })

            newMap.data.addListener('mouseover', (e) => {
                newMap.data.revertStyle()
                let isSelected = e.feature.getProperty('selected')
                if (!isSelected) newMap.data.overrideStyle(e.feature, hoveredStyle)
            })

            newMap.data.addListener('mouseout', (e) => {
                newMap.data.revertStyle()
            })
        })
    }

    const closeDashboard = () => { disableClass('#dashboard', 'half-view') }

    const toggleHeatmap = () => {
        let curOpacity = heatmap.get('opacity')
        let newOpacity = curOpacity == 1 ? 0 : 1
        heatmap.set('opacity', newOpacity)
    }

    return (
        <MapContext.Provider value={{ initMap, dashboardData, currentArea, closeDashboard, toggleHeatmap }}>
            {children}
        </MapContext.Provider>
    )
}