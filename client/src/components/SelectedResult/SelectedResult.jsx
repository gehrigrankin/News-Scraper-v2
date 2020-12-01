import React, { useState, useEffect } from 'react';
import Field from '../Container/Field';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import API from "../../utils/API";
import { useLocation } from 'react-router-dom'

import './SelectedResult.css'

const SelectedResult = (props) => {
    const [isArticleSaved, setIsArticleSaved] = useState(null)

    useEffect(() => {
        if (props.auth.user) {
            API.getSavedArticles(props.auth.user._id)
                .then(res => {
                    setIsArticleSaved(res.data.find(result => result.src == props.selected.src) !== undefined)
                })
        }
    })

    console.log(props.selected);
    // console.log(props.auth);

    const currentPath = useLocation().pathname;

    const selected = props.selected ?
        props.selected : "";

    const text = selected.text ?
        selected.text : [];

    const { src } = selected;

    const saveArticle = () => {
        API.saveArticle({ ...selected, user: props.auth.user })

        setIsArticleSaved(true)
    }

    // const deleteArticle = () => {
    //     API.deleteArticle(props.selected._id)

    //     setIsArticleSaved(false)
    // }

    const displayBtn = () => {
        const { isAuthenticated } = props.auth;

        if (currentPath === '/home') {
            if (!isAuthenticated || isArticleSaved) {
                return null;
            } else {
                return (
                    <div className="mt-2 w-100 has-text-right">
                        <button onClick={saveArticle} className="button is-success is-outlined">
                            Save Article
                        </button>
                    </div>
                )
            }
        } else {
            return (
                <div className="mt-2 w-100 has-text-right">
                    <button onClick={props.deleteArticle} className="button is-danger is-outlined">
                        Delete
                    </button>
                </div>
            )
        }
    }

    return (
        <Field classProp="SelectedResult has-text-left">
            <div className="header">
                <p className="title">{selected.headlineSummary}</p>
                <p className="time has-text-right">{selected.topic} | {selected.timeSummary}</p>
                {displayBtn()}
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