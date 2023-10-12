import osmtogeojson from "osmtogeojson";
import { difference, center, polygon as turf_polygon } from "@turf/turf";

export const areaNames = [
    "Avondale",
    "Clifton",
    "University Heights",
    "Clifton Heights",
    "Corryville",
    "Fairview",
    "Over-the-Rhine",
    "Mount Auburn",
    "The Heights",
]

export const areaNameLookup = {}

export const relationIdToAreaName = (relId) => areaNameLookup[relId]

export const fetchAllPolygons = async () => {
    const promises = []
    const polygons = {}

    for (const areaName of areaNames) {
        const root = "https://overpass-api.de/api/interpreter/";
        const bbox = "(39.075576592,-84.581165313,39.174255609,-84.436283111)";
        const url = `${root}?data=[out:json];relation["name"="${areaName}"]${bbox};(._;>;);out;`;

        promises.push(
            new Promise(async (res, rej) => {
                try {
                    const response = await fetch(url);
                    const json_data = await response.json();
                    const geojson_data = osmtogeojson(json_data);
                    const polygon = geojson_data.features.filter(
                        (f) => f.geometry.type == "Polygon" || f.geometry.type == "MultiPolygon"
                    )[0];

                    const feature_id = polygon.id
                    areaNameLookup[feature_id] = areaName
                    polygons[areaName] = (polygon);

                    res(polygon);
                } catch (error) {
                    rej(error)
                }
            })
        );
    }

    await Promise.all(promises);

    let newCorryville;
    newCorryville = difference(polygons['Corryville'], polygons['Clifton'])
    newCorryville = difference(newCorryville, polygons['The Heights'])
    polygons['Corryville'].geometry.coordinates = newCorryville.geometry.coordinates

    console.log(polygons)

    for (const polygonName in polygons) {
        let polygon = polygons[polygonName]
        polygon.properties['center'] = center(turf_polygon(polygon.geometry.coordinates))
    }

    localStorage.setItem('polygons', JSON.stringify(polygons))
    return polygons
}