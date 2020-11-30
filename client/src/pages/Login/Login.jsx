import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

import './Login.scss';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();
        login(email, password)
    }

    if(isAuthenticated) {
        return <Redirect to="/home" />
    }

    return (
        <div className="Login">
            Log in

            <form onSubmit={e => onSubmit(e)}>
                <div className="field">
                    <label className="label" for="email">Email: </label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="JohnDoe@gmail.com"
                            name="email"
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label" for="password">Password: </label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            placeholder="*********"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                            minLength="6"
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <button
                            className="button is-link"
                            type="submit"
                            value="Login"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>

            <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
        </div>
    )
}

Login.propTypes = {
    setAlert: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, login })(Login);
