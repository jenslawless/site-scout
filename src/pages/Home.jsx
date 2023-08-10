import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    const onButtonClick = () => {
        navigate('/create-new')
    }

    return (
        <div className="mainContainer">
            <div className="titleContainer">
                <h1>Welcome to Site Scout</h1>
            </div>
            <div className="contentContainer">
                <p>This is the home page of Site Scout, a project designed to help small businesses choose their next lcoation.</p>
                <p>With Site Scout, business owners can:</p>
                <ul>
                    <li>Enter in the address of a potential new location</li>
                    <li>Choose a driving distance away from that location to see where potential customers would be coming from</li>
                    <li>Save your maps and access them whenever you need.</li>
                </ul>
                <button className="startButton" onClick={onButtonClick}>Get Started</button>
                <p >Site Scout provides its maps and data with help from Google Geocoding services, Open Route Services, and Leaflet.</p>
            </div>
        </div>
    )
}

