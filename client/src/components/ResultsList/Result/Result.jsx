import React from 'react';

import './Result.css'

const Result = (props) => {
    // console.log(props)
    return (
        <div className="Result" data-src={props.src} onClick={props.handleSelected}>
            <p className="time">
               {props.topic} - {props.date}
            </p>
            <p className="title is-5">
                {props.title}
            </p>
        </div>
    )
}

export default Result;