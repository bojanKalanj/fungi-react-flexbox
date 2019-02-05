import React from 'react';

import './Input.css';

const Input = (props) => {
    return (
        <div className="Input">
            <label>{props.label}</label>
            <input placeholder={props.placeholder}/>
        </div>
    )
}

export default Input;



