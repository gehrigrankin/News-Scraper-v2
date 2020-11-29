import React from 'react';

import './Field.css';

const Field = (props) => {
    let mainDiv = "Field";
    
    if (props.classProp) {
        mainDiv += ` ${props.classProp}`
    }

    return (
        <div className={mainDiv}>
            {props.children}
        </div>
    )
}

export default Field;