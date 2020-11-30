import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div>
            <p>
                <Link to="/register">Register</Link>
            </p>
            <p>
                <Link to="/login">Login</Link>
            </p>
        </div>
    )
}

export default Landing
