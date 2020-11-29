import React from 'react';

import "./ResultsContainer.css"

import ResultsList from '../../components/ResultsList';
import SelectedResult from '../../components/SelectedResult';

const ResultsContainer = (props) => {
    return (
        <div className="ResultsContainer">
            <ResultsList
                results={props.results} 
                topic={props.topic}
                timeRange={props.timeRange}
                handleSelected={props.handleSelected}
            />
            <SelectedResult 
                selected={props.selected}
            />
        </div>
    )
}

export default ResultsContainer;