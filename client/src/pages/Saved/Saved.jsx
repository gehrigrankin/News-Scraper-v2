import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Container from '../../components/Container';
import ResultsContainer from '../../components/ResultsContainer';

import './Saved.css'
import API from '../../utils/API';

const Saved = ({ auth }) => {
    const [savedResults, setSavedResults] = useState([])
    const [selectedResult, setSelectedResult] = useState({})

    console.log(auth)

    useEffect(() => {
        if (auth.user) {
            API.getSavedArticles(auth.user._id)
                .then(res => {
                    console.log(res)
                    setSavedResults(res.data)
                    setSelectedResult(res.data[0])
                })
        }
    }, [auth.user])

    const handleSelected = (event) => {
        const src = event.target.closest(".Result").dataset.src;

        setSelectedResult(savedResults.find(result => result.src == src))
    }

    const deleteArticle = () => {
        const results = savedResults.filter(result => result._id != selectedResult._id)
        
        setSavedResults(results)
        setSelectedResult(results[0])

        API.deleteArticle(selectedResult._id);
    }

    return (
        <div className="Saved">
            <Container className="Container">
                {/* <SearchFilter /> */}
                <ResultsContainer
                    results={savedResults}
                    selected={selectedResult}
                    handleSelected={handleSelected}
                    deleteArticle={deleteArticle}
                />
            </Container>
        </div>
    )
}

Saved.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Saved);