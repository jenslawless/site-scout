import React, { useState, useEffect } from 'react'
import { useUser, UserButton, useAuth } from "@clerk/clerk-react";
import MapView from '../components/MapView';
import axios from 'axios';
import { MapSharp } from '@mui/icons-material';
import { TileLayer, Marker, Polygon, Popup, MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


export default function MyMaps() {
    const { user, isLoaded } = useUser();
    const { sessionId } = useAuth();
    const [myMaps, setMyMaps] = useState([]);

    useEffect(() => {
        const userId = user.id;
        axios.get(`/api/maps/${userId}`)
            .then(response => {
                setMyMaps(response.data);
            })
            .catch(error => {
                console.log("Error fetching user maps:", error);
            });
    }, []);

    console.log(myMaps[0])

    return (
        <>
            <div>
                {myMaps.map((single_map) => (
                    <MapView key={single_map.id} coordinates={single_map.isochrone} center={single_map.center} />
                ))}
            </div>
        </>

    )
}
