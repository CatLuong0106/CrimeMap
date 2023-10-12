const mapBackground = '#E0D0C1'
const textFill = '#601700'
const textStroke = '#F7F9F9'
const x = '#A76D60'
const y = '#00A676'

export const mapStyle = [
    {
        featureType: "poi",
        elementType: "all",
        stylers: [{ visibility: "off" }],
    },
    { elementType: "geometry", stylers: [{ color: mapBackground }] },
    { elementType: "labels.text.stroke", stylers: [{ color: textStroke }] },
    { elementType: "labels.text.fill", stylers: [{ color: textFill }] },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: textFill }],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: textFill }],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: x }],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: textFill }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: x }],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: x }],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: textFill }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: x }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: x }],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: textStroke }],
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: '#2F52E0' }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: textFill }],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: textStroke }],
    },
]