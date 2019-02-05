import React from 'react';

import './Navlinks.css';
import { Link } from 'react-router-dom';

const Navlink = (props) => {
    return (
        <Link to={props.to} className="Navlinks">
            {props.children}
        </Link>
    )
}

export default Navlink;



