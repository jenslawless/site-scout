import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
// import MapView from './MapView'
import { useState, useEffect } from 'react'

const validationSchema = Yup.object().shape({
    address: Yup.string().required('Please enter an address'),
    time: Yup.string().required('Please enter a time'),
});

export default function AddressForm() {
    const [coordinates, setCoordinates] = useState(null)
    // const [newIsoId, setNewIsoId] = useState(null)

    const handleSubmit = async (values) => {
        try {
            const payload = { address: values.address, time: values.time }; // Create an object with "address" key
            const response = await axios.post('/api/geocode', payload);
            const cur_id = response.data.id
            const map_data = await axios.get(`/api/geocode/${cur_id}`)
            console.log(map_data.data.geometry)
            // setCoordinates(map_data.data.geometry.coordinates)

        } catch (error) {
            console.log(error);
            alert('Did not work, try again.');
        }
    };

    useEffect(() => {
        console.log(coordinates);
    }, [coordinates]);

    console.log(coordinates)


    return (
        <>
            <Formik
                initialValues={{
                    address: '',
                    time: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Field type="text" name="address" placeholder="Address" />
                    <Field as="select" name="time">
                        <option value="300">5 minutes</option>
                        <option value="600">10 minutes</option>
                        <option value="900">15 minutes</option>
                        <option value="1200">20 minutes minutes</option>
                        <option value="1800">30 minutes minutes</option>
                        <option value="2400">40 minutes minutes</option>
                    </Field>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </Form>
            </Formik>
            {/* <MapView coordinates={coordinates} /> */}
        </>
    );
};