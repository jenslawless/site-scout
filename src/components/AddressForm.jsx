import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import MapView from './MapView'
import { useState, useEffect } from 'react'
import { useUser } from "@clerk/clerk-react";
import { Button, TextField, Select, MenuItem, Grid, Typography, Card, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const drivingDistanceOptions = [
    { value: '300', label: '5 minutes' },
    { value: '600', label: '10 minutes' },
    { value: '900', label: '15 minutes' },
    { value: '1200', label: '20 minutes' },
    { value: '1800', label: '30 minutes' },
    { value: '2400', label: '40 minutes' },
];


const validationSchema = Yup.object().shape({
    address: Yup.string().required('Please enter an address'),
    time: Yup.string().required('Please enter a time'),
});

export default function AddressForm() {
    const [coordinates, setCoordinates] = useState(null)
    const [newCenter, setNewCenter] = useState(null)
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const { isLoaded, isSignedIn, user } = useUser();
    const navigate = useNavigate();

    if (!isLoaded || !isSignedIn) {
        return null;
    }


    const handleSubmit = async (values) => {
        try {
            const payload = { address: values.address, time: values.time, user_id: user.id };
            const response = await axios.post('/api/geocode', payload);
            const cur_id = response.data.id
            const cur_center = response.data.center
            const map_data = await axios.get(`/api/geocode/${cur_id}`)
            const mapDataObj = JSON.parse(map_data.data);
            const coordinates = mapDataObj.geometry.coordinates;
            setCoordinates(coordinates);
            setNewCenter(cur_center)
            setIsFormSubmitted(true);

        } catch (error) {
            console.log(error);
            alert('Did not work, try again.');
        }
    };

    return (
        <Container>
            <Grid className='contentContainer'>
                <Grid item xs={11} md={5} sx={{ textAlign: 'center', mb: 2 }} >
                    <Typography variant="h4" gutterBottom>
                        How to Use the Form
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Enter an address and select the desired driving time from the dropdown
                        menu. Once you submit the form, the map will display the area you can
                        reach within the specified driving time.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6} className='contentContainer'>
                    <Card sx={{ padding: 15 }}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Address Form
                        </Typography>
                        <Formik
                            initialValues={{
                                address: '',
                                time: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <Field
                                    as={TextField}
                                    type="text"
                                    name="address"
                                    label="Address"
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"

                                />
                                <Field
                                    as={Select}
                                    name="time"
                                    label="Time"
                                    variant="outlined"
                                    margin="normal"
                                    sx={{ width: '100%' }}
                                >
                                    {drivingDistanceOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Field>
                                <Box sx={{ mt: 2 }}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        Submit
                                    </Button>
                                </Box>
                            </Form>
                        </Formik>
                        {isFormSubmitted && (
                            <>
                                <MapView coordinates={coordinates} center={newCenter} />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => navigate('/my-maps')}
                                    sx={{ marginTop: 2 }}
                                >
                                    Go to My Maps
                                </Button>
                            </>
                        )}
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}