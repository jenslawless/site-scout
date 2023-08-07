import React from 'react'
import AddressForm from '../components/AddressForm'
import { useUser, UserButton, useAuth } from "@clerk/clerk-react";


export default function NewMap() {
    const { user, isLoaded } = useUser();
    const { sessionId } = useAuth();

    return (
        <>
            <div>NewMap</div>
            <AddressForm />
        </>
    )
}
