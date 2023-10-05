import React, { useState, useEffect } from 'react'
import { useUser, UserButton, useAuth } from "@clerk/clerk-react";
import MapView from '../components/MapView';
import axios from 'axios';
import { MapSharp } from '@mui/icons-material';
import { TileLayer, Marker, Polygon, Popup, MapContainer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Grid, Card, CardContent, Typography, IconButton, Button } from '@mui/material';
import { NavLink } from 'react-router-dom'

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
        axios.delete(`/api/geocode/${mapId}`)
            .then((response) => {
                setMyMaps((prevMaps) => prevMaps.filter((map) => map.id !== mapId));
            })
            .catch((error) => {
                console.log("Error deleting map:", error);
            });
    };

    return (
        <>
            <Grid item xs={11} md={5} sx={{ textAlign: 'center', mb: 2, padding: 5 }} >
                <Typography variant="h4" gutterBottom>
                    My Maps
                </Typography>
                <Typography variant="body1" paragraph>
                    Here you can compare your maps to analyze which location would be best for your business.
                </Typography>
            </Grid>
            <Grid container spacing={2}>
                {myMaps.map((single_map, index) => (
                    <Grid item xs={11} sm={4} md={4} key={single_map.id}>
                        <Card
                            sx={{
                                border: '2px solid #646cff',
                                borderRadius: '8px',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
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
                                <Button component={NavLink} to={`/indi/${single_map.id}`}>
                                    Explore This Map
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
