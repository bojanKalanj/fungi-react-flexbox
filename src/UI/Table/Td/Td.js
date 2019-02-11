import React from 'react';
import './Td.css';

const Td = (props) => {
    return (
        <td className="Td">
            { props.children }
        </td>
    )
}

export default Td;