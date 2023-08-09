import React, { useState, useEffect } from 'react'
import { useUser, UserButton, useAuth } from "@clerk/clerk-react";
import MapView from '../components/MapView';
import axios from 'axios';
import { MapSharp } from '@mui/icons-material';
import { TileLayer, Marker, Polygon, Popup, MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Grid, Card, CardContent, Typography, IconButton } from '@mui/material';


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

    const handleDeleteMap = (mapId) => {
        // Make an API call to delete the map from the backend
        axios.delete(`/api/geocode/${mapId}`)
            .then((response) => {
                // If deletion was successful, update the frontend state
                setMyMaps((prevMaps) => prevMaps.filter((map) => map.id !== mapId));
            })
            .catch((error) => {
                console.log("Error deleting map:", error);
            });
    };

    return (
        <Grid container spacing={2}>
            {myMaps.map((single_map, index) => (
                <Grid item xs={11} sm={4} md={4} key={single_map.id}>
                    <Card
                        sx={{
                            border: '2px solid #646cff',
                            borderRadius: '8px',
                            width: '100%', // Adjust the width as needed
                            height: '100%', // Adjust the height as needed
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center', // Center content vertically
                            alignItems: 'center', // Center content horizontally
                            textAlign: 'center', // Center text
                        }}
                    >
                        <CardContent>
                            <MapView coordinates={single_map.isochrone} center={single_map.center} />
                            <Typography variant="body2" mt={1}>
                                <strong>Address:</strong> {single_map.address}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Driving Distance Away:</strong>  {(single_map.time_range) / 60} minutes
                            </Typography>
                            <button
                                className="delete-button"
                                onClick={() => handleDeleteMap(single_map.id)}
                            >
                                Delete
                            </button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}
