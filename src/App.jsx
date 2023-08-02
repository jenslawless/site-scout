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
        <header>
          <nav>
            <h1>Site Scout</h1>
            <NavLink to="/">Home</NavLink>
            <br></br>
            <NavLink to="my-maps">My Maps</NavLink>
            <br></br>
            <NavLink to="create-new">Create a New Map</NavLink>
          </nav>
        </header>
        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/my-maps' element={<MyMaps />} />
            <Route path='/create-new' element={<NewMap />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
