import React from 'react';

import './Container.css';

export const Container = (props) => {
    return (
        <div className="Container">
            {props.children}
        </div>
    )
}

export const FlexContainer = (props) => {
    return (
        <div className="FlexContainer">
            {props.children}
        </div>
    )
}




