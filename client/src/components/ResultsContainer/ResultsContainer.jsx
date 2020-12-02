import React from 'react';

import "./ResultsContainer.css";

import ResultsList from '../../components/ResultsList';
import SelectedResult from '../../components/SelectedResult';

const ResultsContainer = (props) => {
    return (
        <div className="ResultsContainer box-shadow">
            <ResultsList
                results={props.results} 
                topic={props.topic}
                timeRange={props.timeRange}
                handleSelected={props.handleSelected}
                selected={props.selected}
            />
            <SelectedResult 
                selected={props.selected}
                deleteArticle={props.deleteArticle}
            />
        </div>
    )
}

export default ResultsContainer;