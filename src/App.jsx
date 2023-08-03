import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import Home from './pages/Home'
import MyMaps from './pages/MyMaps';
import NewMap from './pages/NewMap';
import NavBar from './components/NavBar';


function App() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <BrowserRouter>
        <NavBar />
        <div style={{ marginTop: 80 }}>
          <main>
            <Routes>
              <Route index element={<Home />} />
              <Route path='/my-maps' element={<MyMaps />} />
              <Route path='/create-new' element={<NewMap />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
