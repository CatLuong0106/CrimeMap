import './App.css'
import GoogleMap from './components/GoogleMap';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import { MapProvider } from './contexts/MapContext';

function App() {  
  return (
    <MapProvider>
      <NavBar />
      <main>
        <GoogleMap />
        <Dashboard />
      </main>
    </MapProvider>
  )
}

export default App
