import React from 'react';

import './InputBox.css';

const InputBox = (props) => (
    <div className="InputBox field">
        <label className="label">{props.label}</label>
        <div className="control">
            <input className="input" type="text" placeholder={props.placeholder} />
        </div>
    </div>
)

export default InputBox;