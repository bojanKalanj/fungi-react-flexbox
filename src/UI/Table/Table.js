import React from 'react';
import './Table.css';

const Table = (props) => {
    return (
        <table className="Table">
            { props.children }
        </table>
    )
}

export default Table;