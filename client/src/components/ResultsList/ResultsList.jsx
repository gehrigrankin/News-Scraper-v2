import React from 'react';

import "./ResultsList.css";
import Field from '../Container/Field';
import Result from './Result'

const ResultsList = props => {
    return (
        <Field classProp="ResultsList">
            <div className="filter-var">
                <strong>Topic:</strong> {props.topic} &emsp;&emsp;
                <strong>From:</strong> {props.timeRange}
            </div>

            <div className="article-list">
                {Array.isArray(props.results) ? props.results.map((article, index) => {
                    return (
                        <Result 
                            key={index}
                            id={article.id}
                            title={article.headline}
                            topic={article.topic}
                            date={article.time}
                            src={article.src}
                            handleSelected={props.handleSelected}
                        />
                    )
                }) : null}
            </div>
        </Field>
    )
}

export default ResultsList