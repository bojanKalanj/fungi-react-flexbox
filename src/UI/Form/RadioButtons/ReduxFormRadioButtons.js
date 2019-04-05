import React from 'react';
import { Field } from 'redux-form';
import '../Input/Input.css'

const radioButtons = props => {
    const radio = props.radio;
    return(
        <div className="Input">
            <label>{radio.label}</label>
            <div>
            <label><Field name={radio.param} component="input" type="radio" value="NEODREĐENO"/> Neodređeno</label>
            {
                radio.buttons.map(button => {
                    return <label><Field name={radio.param} component="input" type="radio" value={button.value}/> {button.label}</label>
                })
            }
            </div>
        </div>
    )
}

export default radioButtons;