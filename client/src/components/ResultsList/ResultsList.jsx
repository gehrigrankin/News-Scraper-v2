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
                {props.results.map((article, index) => {
                    return (
                        <Result 
                            key={index}
                            id={article._id}
                            title={article.headline}
                            description={article.summary}
                            topic={article.topic}
                            date={article.time}
                            handleSelected={props.handleSelected}
                        />
                    )
                })}
            </div>
                
     
        </Field>
    )
}

export default ResultsList