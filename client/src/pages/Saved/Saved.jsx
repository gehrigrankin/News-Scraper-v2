import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

import Container from '../../components/Container';
import ResultsContainer from '../../components/ResultsContainer';

import './Saved.css'
import API from '../../utils/API';

const Saved = ({ getCurrentProfile, auth, profile }) => {
    const [savedResults, setSavedResults] = useState([])
    const [selectedResult, setSelectedResult] = useState({})

    console.log(auth)

    useEffect(() => {
        if (auth.user) {
            API.getSavedArticles(auth.user._id)
                .then(res => {
                    console.log(res)
                    setSavedResults(res.data)

                    API.getSelectedArticle(res.data[0])
                        .then(res => {
                            console.log("selected RES", res);

                            setSelectedResult(res.data)
                        })
                        .catch(err => console.log(err))
                })
        }
    }, [auth.user])

    const handleSelected = (event) => {
        const src = event.target.closest(".Result").dataset.src;

        setSelectedResult(savedResults.find(result => result.src == src))
    }

    return (
        <div className="Saved">
            <Container className="Container">
                {/* <SearchFilter /> */}
                <ResultsContainer
                    results={savedResults}
                    selected={selectedResult}
                    handleSelected={handleSelected}
                />
            </Container>
        </div>
    )
}

Saved.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Saved);