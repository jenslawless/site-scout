import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object().shape({
    address: Yup.string().required('Please enter an address'),
    time: Yup.string().required('Please enter a time'),
});

export default function AddressForm() {
    const handleSubmit = async (values) => {
        try {
            const payload = { address: values.address, time: values.time }; // Create an object with "address" key
            await axios.post('/api/geocode', payload); // Send the payload as JSON in the POST request
        } catch (error) {
            console.log(error);
            alert('Did not work, try again.');
        }
    };

    return (
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
    );
};