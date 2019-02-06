import React from 'react';

import './Form.css';

const Form = (props) => {
    return (
        <form className="Form">
            <h4>{ props.title }</h4>
            <hr />
            { props.children }
        </form>
    )
}

export default Form;



