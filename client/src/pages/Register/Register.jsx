import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

import './Register.scss';

const Register = ({ setAlert, register }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();

        if (password !== password2) {
            setAlert("Paswords do not match", 'danger')
        } else {
            register({ name, email, password });
        }
    }

    return (
        <div className="Register">
            Register

            <form onSubmit={e => onSubmit(e)}>
                <div className="field">
                    <label className="label" for="name">Name: </label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="John Doe"
                            name="name"
                            value={name}
                            onChange={e => onChange(e)}
                            
                        />
                    </div>
                </div>
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
                            
                            
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label" for="password2">Confirm Password: </label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            placeholder="*********"
                            name="password2"
                            value={password2}
                            onChange={e => onChange(e)}
                            
                            
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <button
                            className="button is-link"
                            type="submit"
                            value="Register"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
            
            <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
}

export default connect(null, { setAlert, register })(Register);
