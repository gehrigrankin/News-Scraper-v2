import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Register.scss';

const Register = () => {
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
            console.log("Paswords do not match")
        } else {
            console.log('success')
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
                            required
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
                    <label className="label" for="password2">Confirm Password: </label>
                    <div className="control">
                        <input
                            className="input"
                            type="password"
                            placeholder="*********"
                            name="password2"
                            value={password2}
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

export default Register
