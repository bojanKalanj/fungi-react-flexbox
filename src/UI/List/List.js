import React from 'react';

import './List.css';

const List = (props) => {
    const list = () => {
        let li = [];
        for(let key in props.toList){
            li.push(<li key={key} >{key} <span className="pull-right">{props.toList[key]}</span> </li>)
        }
        return li
    }
    return (
        <ul className="List">
            { list() }
        </ul>
    )
}

export default List;



