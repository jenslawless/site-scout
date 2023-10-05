import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link, NavLink, useNavigate } from 'react-router-dom';
import Home from './pages/Home'
import MyMaps from './pages/MyMaps';
import NewMap from './pages/NewMap';
import NavBar from './components/NavBar';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignIn,
  SignUp,
  UserButton,
  SignOutButton,
  ClerkLoaded
} from "@clerk/clerk-react";
import IndiMap from './pages/IndiMap';

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
        <BrowserRouter>
          <SignedIn>
            <NavBar />
            <div style={{ marginTop: 80 }}>
              <main>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path='/my-maps' element={<MyMaps />} />
                  <Route path='/create-new' element={<NewMap />} />
                  <Route path='/indi/:mapId' element={<IndiMap />} />
                </Routes>
              </main>
            </div>
          </SignedIn>
          <SignedOut>
            <SignIn />
          </SignedOut>
        </BrowserRouter>
      </div>
    </ClerkProvider >
  )
}

export default App