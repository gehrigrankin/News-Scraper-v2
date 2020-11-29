import React from 'react';
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar is-success">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    New york Times Scraper
                </Link>
            
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className="navbar-menu">
                <div className="navbar-end">
                    <Link className="navbar-item" to="/saved">Saved Articles</Link>
                    <Link className="navbar-item" to="/">Home</Link>
                </div>
            </div>
            
        </nav>

    )
}

export default Navbar