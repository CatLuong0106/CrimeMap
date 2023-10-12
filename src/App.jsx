import './App.css'
import MainPage from './pages/MainPage';
import About from './pages/About';
import Author from './pages/Author';
import NavBar from './components/NavBar';
import { MapProvider } from './contexts/MapContext';
import { Routes, Route } from 'react-router-dom';

function App() {  
  return (
    <MapProvider>
      <NavBar />
      <main>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/about' element={<About />} />
          <Route path='/author' element={<Author />} />
        </Routes>
      </main>
    </MapProvider>
  )
}

export default App
