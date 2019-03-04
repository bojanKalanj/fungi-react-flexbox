import React from 'react';

import './Input.css';

const Input = (props) => {
    let inputElement = null;

    let cssClasses = ["Input"]

    if(props.invalid && props.touched){
        cssClasses.push("invalid")
    }

    switch(props.elementType){
        case ('input'):
            inputElement = <input 
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                className={cssClasses.join(' ')}
                placeholder={props.placeholder}
                />;
            break;
        case ('textarea'):
            inputElement = <textarea rows="7" 
                value={props.value}
                onChange={props.onChange}
                className={cssClasses.join(' ')}
                placeholder={props.placeholder}
                />;
            break;
        case ('select'):
            inputElement = (
                <select
                    value={props.value}
                    onChange={props.onChange}>
                    {props.options.map(option => (
                        <option key={option.id} value={option.id}>
                            { option.name }
                        </option>
                    ))}
                </select>
        )
        break;
        default:
            inputElement = <input 
                value={props.value}
                onChange={props.onChange}
                className={cssClasses.join(' ')}
                placeholder={props.placeholder}
                />;
    }

    return (
        <div className="Input">
            <label>{props.label}</label>
            { inputElement }
        </div>
    )
}

export default Input;



