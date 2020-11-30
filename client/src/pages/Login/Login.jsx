import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Login.scss';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault();

        console.log('success')

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

export default Login
