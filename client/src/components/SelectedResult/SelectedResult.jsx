import React from 'react';
import Field from '../Container/Field';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import API from "../../utils/API";
import { useLocation } from 'react-router-dom'

import './SelectedResult.css'

const SelectedResult = (props) => {
    console.log(props.selected);
    // console.log(props.auth);

    const currentPath = useLocation().pathname;

    const selected = props.selected ?
        props.selected : "";

    const text = selected.text ?
        selected.text : [];

    const { src } = selected;

    const saveArticle = () => {
        API.saveArticle({...selected, user: props.auth.user})
    }

    return (
        <Field classProp="SelectedResult has-text-left">
            <div className="header">
                <p className="title">{selected.headlineSummary}</p>
                <p className="time has-text-right">{selected.topic} | {selected.timeSummary}</p>
                {console.log()}
                { props.auth.isAuthenticated && 
                    currentPath !== '/saved' ? 
                        <div className="mt-2 w-100 has-text-right">
                            <button onClick={saveArticle} className="button is-success is-outlined">
                                Save Article
                            </button>
                        </div> : null}
            </div>
            <hr />

            <div className="article">
                {
                    text.map((x, i) => {
                        return (
                            <p key={i}
                                className="content-p"
                            >
                                {x}
                            </p>
                        )
                    })
                }
            </div>
            <div className="links">
                <a target="_blank" rel="noreferrer" href={src}>{src}</a>
            </div>
        </Field>
    )
}

SelectedResult.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(SelectedResult);