import React from 'react';

import {FlexContainer} from '../../UI/Container/Container'

import './Form.css';

const Form = (props) => {
    return (
        <div style={{display: "flex"}} >
            <div style={{width: '50%', background: "#3cc47c"}}></div>
            <form onSubmit={props.onSubmit} className="Form">
                <h4>{ props.title }</h4>
                <hr />
                { props.children }
            </form>
        </div>
    )
}

export default Form;



