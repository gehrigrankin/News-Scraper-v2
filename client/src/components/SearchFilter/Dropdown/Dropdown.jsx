import React from 'react';

import './Dropdown.css';

const Dropdown = props => {
    return (
        <div className={`dropdown ${props.isActive ? "is-active" : ""}`}>
            <div className="dropdown-trigger">
                <button onClick={() => props.toggleActive(props.name)} className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>Dropdown button</span>
                    <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    <a href="#" className="dropdown-item">
                        Dropdown item
                    </a>
                    <a className="dropdown-item">
                        Other dropdown item
                    </a>
                    <a href="#" className="dropdown-item">
                        Other dropdown item
                    </a>
                </div>
            </div>
        </div>

    )
}

export default Dropdown;