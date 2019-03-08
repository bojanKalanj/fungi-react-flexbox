import React from 'react';

import './Button.css';

const Button = (props) => {
    let cssClasses = ["Button"]

    if(props.disabled){
        cssClasses.push("Disabled");
    }

    if(props.red){
        cssClasses.push("Red");
    }

    if(props.wide){
        cssClasses.push("Wide");
    }

    if(props.border){
        cssClasses.push("Bordered");
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



