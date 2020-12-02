import React from 'react';

import Field from '../Container/Field';
import Result from './Result'

import "./ResultsList.css";

const ResultsList = props => {
    return (
        <Field classProp="ResultsList">
            <div className="filter-var">
                <strong>Topic:</strong> {props.topic}
            </div>

            <div className="article-list">
                {Array.isArray(props.results) ? props.results.map((article, index) => {
                    if (!article.time) {
                        return;
                    }

                    return (
                        <Result 
                            key={index}
                            id={article.id}
                            title={article.headline}
                            topic={article.topic}
                            date={article.time}
                            src={article.src}
                            handleSelected={props.handleSelected}
                            selected={props.selected}
                        />
                    )
                }) : null}
            </div>
        </Field>
    )
}

export default ResultsList