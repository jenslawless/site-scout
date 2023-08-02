"use client"
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    address: Yup.string().required('Please enter an address'),
});


export default function AddressForm() {
    const handleSubmit = (values) => {
        // Handle form submission here, e.g., sending the address to the server
        console.log('Submitted address:', values.address);
    };

    return (
        <Formik
            initialValues={{ address: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <div>
                    <label htmlFor="address">Address:</label>
                    <Field type="text" id="address" name="address" />
                    <ErrorMessage name="address" component="div" />
                </div>

                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
};

