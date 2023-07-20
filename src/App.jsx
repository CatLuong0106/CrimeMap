import './App.css'
import { useState } from 'react';
import GoogleMap from './components/GoogleMap';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import getRandomColor from './utils/RandomColor';

function App() {
  const [mapThemeColor, setMapThemeColor] = useState('black');

  function parentOnClickHandler() {
    console.log("Change color button clicked")
    setMapThemeColor(getRandomColor());
  }
  
  return (
    <>
      <NavBar />
      <main>
        <GoogleMap mapThemeColor={mapThemeColor}/>
        <Dashboard parentOnClickHandler={parentOnClickHandler}/>
      </main>
    </>
  )
}

export default App
