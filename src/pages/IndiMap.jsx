import React, { useState, useEffect } from 'react'
import { useUser, UserButton, useAuth } from "@clerk/clerk-react";
import MapView from '../components/MapView';
import axios from 'axios';
import { MapSharp } from '@mui/icons-material';
import { TileLayer, Marker, Polygon, Popup, MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Grid, Card, CardContent, Typography, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom'


export default function IndiMap() {
    const { user, isLoaded, isSignedIn } = useUser();
    const { sessionId } = useAuth();
    const { mapId } = useParams();
    const [indiMap, setIndiMap] = useState({});

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/geocode/${mapId}`);
                if (response.data) {
                    const mapDataObj = JSON.parse(response.data);
                    setIndiMap(mapDataObj);
                } else {
                    console.log('Data not found'); // Handle the case where data is not found
                }
            } catch (error) {
                console.error('Error fetching map data:', error);
                alert('An error occurred while fetching map data.');
            }
        };

        fetchData(); // Call the async function to fetch data
    }, [mapId]);

    return (
        <div>
            {/* <h1>{user.id}</h1> */}
            HEllo
        </div>
    )
} 