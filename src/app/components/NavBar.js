import React from 'react'
import { AppBar, Toolbar } from "@mui/material";
import Link from 'next/link';

export const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <div className="w-full h-20 bg-emerald-800 sticky top-0">
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex justify-between items-center h-full">
                            <ul className="hidden md:flex gap-x-6 text-white">
                                <li>
                                    <Link href="/home">
                                        <p>Home</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/my-maps">
                                        <p>My Maps</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/create-new">
                                        <p>Create New Map</p>
                                    </Link>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    )
}
