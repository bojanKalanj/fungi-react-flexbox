import React from 'react';

import './Input.css';

const Input = (props) => {
    let inputElement = null;

    let invalidCss = null;

    if(props.invalid && props.touched){
        invalidCss = "invalid"
    }

    switch(props.elementType){
        case ('input'):
            inputElement = <input 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.onChange}
                className={invalidCss} />;
            break;
        case ('textarea'):
            inputElement = <textarea rows="10" cols="50"
                {...props.elementConfig} 
                value={props.value}
                onChange={props.onChange}
                className={invalidCss} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    value={props.value}
                    onChange={props.onChange}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            { option.displayValue }
                        </option>
                    ))}
                </select>
        )
        break;
        default:
            inputElement = <input 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.onChange}
                className={invalidCss} />;
    }

    return (
        <div className="Input">
            <label>{props.label}</label>
            { inputElement }
        </div>
    )
}

export default Input;



