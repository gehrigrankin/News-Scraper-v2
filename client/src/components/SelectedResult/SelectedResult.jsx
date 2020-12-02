import React, { useState, useEffect } from 'react';
import Field from '../Container/Field';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import API from "../../utils/API";
import { useLocation, Link } from 'react-router-dom'

import './SelectedResult.css'

const SelectedResult = (props) => {
    const [isArticleSaved, setIsArticleSaved] = useState(null)

    useEffect(() => {
        if (props.auth.user && currentPath === '/home') {
            API.getSavedArticles(props.auth.user._id)
                .then(res => {
                    console.log(props.selected)
                    setIsArticleSaved(res.data.find(result => result.src === props.selected.src) !== undefined)
                })
        }
    }, [props.auth.user, props.selected])

    const currentPath = useLocation().pathname;

    const { selected } = props;

    const saveArticle = () => {
        API.saveArticle({ ...selected, user: props.auth.user })

        setIsArticleSaved(true)
    }

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

    if (!selected || !selected.text) {
        return (
            <Field classProp="SelectedResult">
                <div className="header">
                    <p className="title">Save articles on the home page to view saved articles</p>
                </div>
                <hr />

                <div className="article has-text-left">
                    <p className="content-p">
                        Go to the home page, select an article that you are interested in or would like to save and click the save article button!
                    </p>
                    <p className="content-p">
                        Your saved articles will appear here for you to view whenever you'd like.
                    </p>
                    <p className="content-p">Click here to go to the <Link to="/Home">Home Page</Link></p>
                </div>
            </Field>
        )
    }

    if (selected.text && selected.text.length === 0) {
        return (
            <Field classProp="SelectedResult">
                <div className="header">
                    <h4 className="title is-4">Article cannot be scraped</h4>

                    <div className="links mt-4">
                        <p>Visit the article here: </p>
                        <a target="_blank" rel="noreferrer" href={selected.src}>{selected.src}</a>
                    </div>
                </div>
            </Field>
        )
    }

    return (
        <Field classProp="SelectedResult has-text-left">
            <div className="header">
                <p className="title">{selected.headlineSummary}</p>
                <p className="time has-text-right has-text-link"><b>{selected.topic}</b> | {selected.timeSummary}</p>
                <p className="has-text-right has-text-info"><b>{selected.author}</b> {selected.company}</p>
                {displayBtn()}
            </div>
            <hr />

            <div className="article">
                {
                    selected.text.map((x, i) => {
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
                <a target="_blank" rel="noreferrer" href={selected.src}>{selected.src}</a>
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