import React from 'react';

import './Result.scss'

const Result = (props) => {
    const selected = props.selected.src === props.src ? 'selected' : null
    return (
        <div className={`Result ${selected}`} data-src={props.src} onClick={props.handleSelected}>
            <p className="time has-text-link">
               {props.topic} - {props.date}
            </p>
            <p className="title is-5">
                {props.title}
            </p>
        </div>
    )
}

export default Result;