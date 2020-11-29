import React from 'react';

import './SearchFilter.css'
import Field from '../Container/Field';
import Dropdown from './Dropdown';

class SearchFilter extends React.Component {
    state = {
        sortBy: true,
        two: false,
        three: false
    };

    toggleActive = name => {
        const currentState = this.state[name];
        this.setState({
            [name]: !currentState
        });
    }

    render() {
        return (
            <Field classProp="SearchFilter">
                <Dropdown 
                    toggleActive={this.toggleActive} 
                    isActive={this.state.one}
                    name="sortBy"
                />
                <Dropdown 
                    toggleActive={this.toggleActive} 
                    isActive={this.state.two}
                    name="two"
                />
                <Dropdown 
                    toggleActive={this.toggleActive} 
                    isActive={this.state.three}
                    name="three"
                />
            </Field>
        )
    }
}

export default SearchFilter;