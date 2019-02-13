import React from 'react';

import './Card.css';

export const Card = (props) => {
    return (
        <div style={{ width: props.width, background: props.color }} className="Card">
            { props.children }
        </div>
    )
}

export const CardBody = (props) => {
    return (
        <div className="CardBody">
            { props.children }
        </div>
    )
}





