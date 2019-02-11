import React from 'react';
import './Th.css';

const Th = (props) => {
    return (
        <th className="Th">
            { props.children }
        </th>
    )
}

export default Th;