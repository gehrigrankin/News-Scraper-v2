import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons'

import './Landing.scss'

const Landing = () => {
    return (
        <div className="Landing has-background-link">
            <div className="column is-full">
                <h1 class="title is-1 has-text-white">
                    <FontAwesomeIcon className="has-text-info" icon={faNewspaper} />
                    AZ Central Scraper
                </h1>
            </div>
            <div className="column box-shadow window has-background-white is-half-desktop">
                <p>
                    <Link to="/register">Register</Link>
                </p>
                <p>
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Landing
