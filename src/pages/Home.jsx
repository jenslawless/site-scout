import React from 'react'
import { useNavigate } from "react-router-dom"

export default function Home() {

    const navigate = useNavigate();

    const onButtonClick = () => {
        // You'll update this function later
    }

    return (
        <div className="mainContainer">
            <div className={"titleContainer"}>
                <div>Welcome!</div>
            </div>
            <div>
                This is the home page.
            </div>
        </div>
    )
}

