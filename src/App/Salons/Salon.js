import React from 'react'
import { useLocation } from 'react-router-dom';

function Salon() {
    const location = useLocation()
    const { id } = location.state
    return (
        <div>
            <h1>This is salon page</h1>
            <h2>{id}</h2>
        </div>
    )
}

export default Salon;
