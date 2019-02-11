import React from 'react';
import './Table.css';

const Table = (props) => {
    return (
        <table className="Table">
            <tbody>
                { props.children }
            </tbody>
        </table>
    )
}

export default Table;