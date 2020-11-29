import React from 'react';

import './SearchForm.css';

import InputBox from '../InputBox';

const SearchForm = (props) => {
    return (
        <form className="SearchForm">

            <InputBox className="InputBox" label="Topic" placeholder="Net Neutrality" />
            <InputBox className="InputBox" label="Start Year" placeholder="2000" />
            <InputBox className="InputBox" label="End Year" placeholder="2018" />

            <a className="button is-success" type="submit" onClick={props.submit}>submit</a>
            <a className="button is-danger" type="submit" onClick={props.handleArticleSave}>save</a>

        </form>
    )
}

export default SearchForm;