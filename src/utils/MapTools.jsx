export const addGeometry = (type, id, map, coords, properties) => {
    return map.data.add({
        id: id,
        geometry: new google.maps.Data[type](coords),
        properties: {
            selected: false,
            color: 'yellow,',
            ...properties
        },
    })
}

export const addAdvancedMarker = async (map, coords, content) => {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")
    return new AdvancedMarkerElement({
        map: map,
        position: coords,
        content: (() => {
            const el = document.createElement('div')
            el.classList.add('map-marker')
            el.innerHTML = content
            return el
        })()
    })
}

export const addMarker = async (map, coords, content) => {
    return await new google.maps.Marker({
        map: map,
        position: coords,
        title: content
    })
}

export const addInfoWindow = async (map, coords, content) => {
    
    const element = document.createElement('div')
    element.classList.add('map-marker')
    element.innerHTML = content

    return await new google.maps.InfoWindow({
        position: coords,
        map: map, 
        content: element,
    })
}