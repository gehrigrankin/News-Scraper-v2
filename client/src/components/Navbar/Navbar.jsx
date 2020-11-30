import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

import "./Navbar.css";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <a onClick={logout} href="#!">
            <span class="icon">
                <i class="fas fa-home"></i>
            </span>{' '}
            Logout
        </a>
    )

    // const guestLinks = (

    // )

    return (
        <nav className="navbar is-success">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    AZ Central Scraper
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
                    { !loading && isAuthenticated ? authLinks : null }
                </div>
            </div>

        </nav>

    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);