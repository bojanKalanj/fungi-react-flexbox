import React from 'react';
import './Tr.css';

const Tr = (props) => {
    return (
        <tr className="Tr">
            { props.children }
        </tr>
    )
}

export default Tr;