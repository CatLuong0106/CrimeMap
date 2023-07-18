import { Loader } from '@googlemaps/js-api-loader'
import './App.css'

function App() {
  const center = { lat: 39.132007245791385, lng: -84.51562682302736 };
  const zoom = 15;
  const loader = new Loader({
    apiKey: "AIzaSyCHgrOkqzasqmym75emtsg0JppEb-Ew56c",
    version: "weekly",
  })

  let map;

  loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), { center, zoom })
  })

  return (
    <div id="map">
    </div>
  )
}

export default App
