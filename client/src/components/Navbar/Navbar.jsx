import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

import "./Navbar.css";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <Fragment>
            <Link className="navbar-item" to="/saved">Saved Articles</Link>
            <a onClick={logout} href="#!">
                <span className="icon">
                    <i className="fas fa-home"></i>
                </span>{' '}
                Logout
            </a>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <Link className="navbar-item" to="/register">Sign Up</Link>
            <Link className="navbar-item" to="/login">Login</Link>
        </Fragment>
    )

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
                    <Link className="navbar-item" to="/home">Home</Link>
                    { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>) }
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