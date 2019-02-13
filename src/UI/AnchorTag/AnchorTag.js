import React from 'react';

import './AnchorTag.css';
import { Link } from 'react-router-dom';

export const AnchorTag = (props) => {
    return (
        <Link to={props.to} className="AnchorTag">
            {props.children}
        </Link>
    )
}

export const TitleLinks = (props) => {
    return (
        <Link to={props.to} className="AnchorTag TitleLinks">
            {props.children}
        </Link>
    )
}




