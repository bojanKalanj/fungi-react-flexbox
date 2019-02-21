import React from 'react';
import Input from './Input/Input';
import Button from '../Button/Button';

import './Form.css';

const Form = (props) => {
    let formElements = props.formElements
    let inputs = [];
    
    console.log(formElements);
    for(let key in formElements){
        inputs.push(<Input 
                    key={key}
                    elementType={formElements[key].elementType}
                    type={formElements[key].type}
                    placeholder={formElements[key].placeholder}
                    value={formElements[key].value}
                    label={formElements[key].label}
                    options={formElements[key].options}
                    onChange={(event) => props.inputChangedHandler(event, key)}
                    // invalid={!formElements[key].validation.valid}
                    touched={formElements[key].touched}
                    />)
    }
    return (
            <form onSubmit={props.onSubmit} className="Form">
                <h4>{ props.title }</h4>
                <hr />
                { inputs }
                <Button red>
                   Filter
               </Button>
            </form>
    )
}

export default Form;



