import React from 'react'
import { useUser, UserButton, useAuth } from "@clerk/clerk-react";

export default function MyMaps() {
    const { user, isLoaded } = useUser();
    const { sessionId } = useAuth();

    return (
        <div>MyMaps</div>
    )
}
