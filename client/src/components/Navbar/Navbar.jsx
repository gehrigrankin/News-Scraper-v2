import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faUserPlus, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import "./Navbar.scss";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const [isActive, setIsActive] = useState(false);

    const authLinks = (
        <Fragment>
            <div className="navbar-start">
                <Link className="navbar-item" to="/home">Home</Link>
                <Link className="navbar-item" to="/saved">Saved Articles</Link>
            </div>
            <div className="navbar-end">
                <Link className="navbar-item" onClick={logout} to="/">
                    <FontAwesomeIcon className="has-text-info" icon={faSignOutAlt} />
                    Logout
                </Link>
            </div>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <div className="navbar-start">
                <Link className="navbar-item" to="/home">Home</Link>
            </div>
            <div className="navbar-end">
                <Link className="navbar-item" to="/register">
                    <FontAwesomeIcon className="has-text-info" icon={faUserPlus} />
                    Sign Up
                </Link>
                <Link className="navbar-item" to="/">
                    <FontAwesomeIcon className="has-text-info" icon={faSignInAlt} />
                    Login
                </Link>
            </div>
        </Fragment>
    )

    return (
        <nav className="navbar px-5 is-info">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/home">
                    <FontAwesomeIcon className="has-text-info" icon={faNewspaper} size="lg" />
                    <span className="navbar-title">AZ Central Scraper</span>
                </Link>

                <a 
                    role="button"
                    className={`navbar-burger ${isActive ? 'is-active' : ''}`}
                    aria-label="menu"
                    aria-expanded="false"
                    onClick={() => {
                        setIsActive(!isActive);
                    }}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
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