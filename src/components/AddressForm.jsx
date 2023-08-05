import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import MapView from './MapView'
import { useState, useEffect } from 'react'

const validationSchema = Yup.object().shape({
    address: Yup.string().required('Please enter an address'),
    time: Yup.string().required('Please enter a time'),
});

export default function AddressForm() {
    const [coordinates, setCoordinates] = useState(null)
    const [newCenter, setNewCenter] = useState(null)

    const handleSubmit = async (values) => {
        try {
            const payload = { address: values.address, time: values.time }; // Create an object with "address" key
            const response = await axios.post('/api/geocode', payload);
            const cur_id = response.data.id
            console.log(response.data)
            const cur_center = response.data.center
            const map_data = await axios.get(`/api/geocode/${cur_id}`)
            const mapDataObj = JSON.parse(map_data.data);
            const coordinates = mapDataObj.geometry.coordinates;
            setCoordinates(coordinates);
            setNewCenter(cur_center)
            console.log(newCenter)

        } catch (error) {
            console.log(error);
            alert('Did not work, try again.');
        }
    };

    useEffect(() => {
        console.log(newCenter);
    }, [newCenter]);

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
            <MapView coordinates={coordinates} center={newCenter} />
        </>
    );
};