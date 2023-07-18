import { Loader } from '@googlemaps/js-api-loader'
import './App.css'

function App() {
  let center = { lat: 39.152007245589185, lng: -84.51562682302536 };
  const zoom = 14;
  const loader = new Loader({
    apiKey: "AIzaSyCHgrOkqzasqmym75emtsg0JppEb-Ew56c",
    version: "weekly",
  })

  let map;

  loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), { center, zoom })
    map.data.loadGeoJson('clifton.geojson');
  })

  return (
    <div id="map">
    </div>
  )
}

export default App
