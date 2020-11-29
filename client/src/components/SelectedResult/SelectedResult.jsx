import React from 'react';
import Field from '../Container/Field';

import './SelectedResult.css'

const SelectedResult = (props) => {
    console.log(props.selected);

    const selected = props.selected ? 
    props.selected : "";
        
    const content = selected.content ? 
    selected.content : [];

    const links = selected.links ? 
    selected.links : [];

    return (
        <Field classProp="SelectedResult has-text-left">
            <div className="header">
                <p className="title">{selected.headline}</p>
                <p className="time has-text-right">{selected.topic} | {selected.time}</p>
            </div>
            <hr/>

            <div className="article">
                {
                    content.map((x, i) => {
                        return (
                            <p key={i}
                                className="content-p"
                            >
                                {x}
                            </p> 
                        )
                    })
                }
                <ul className="link-list">
                {
                    links.map((x, i) => {
                        return (
                            <li key={i}><a className="link" href={"https://www.azcentral.com" + x.src}>
                                {x.text}
                            </a></li>
                        )
                    })
                }
                </ul>
            </div>
        </Field>
    )
}

export default SelectedResult;