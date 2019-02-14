import React from 'react';

import './Button.css';

const Button = (props) => {
    let cssClasses = ["Button"]

    if(props.disabled){
        cssClasses.push("Disabled");
    }

    return (
        <button 
            disabled={props.disabled}
            className={cssClasses.join(" ")}>
            { props.children }
        </button>
    )
}

export default Button;



