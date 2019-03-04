import React, { Component } from 'react';
import Input from './Input/Input';
import Button from '../Button/Button';

import './Form.css';

class Form extends Component {
    formElements = this.props.formElements;

    invalid = false;

    checkvalidity = input => {
        if(input.validation){
            if(input.validation.required){
                if(input.value.length >= 1){
                    input.validation.valid = true;
                }else{
                    input.validation.valid = false;
                } 
            }
        }
    }

    isFormValid = false;

    inputChangedHandler = (event, formInput) => {
        let newFormInput = this.formElements[formInput];
        newFormInput.value = event.target.value;
        newFormInput.touched = true;
        this.checkvalidity(newFormInput);

        let validity = [];

        for(let key in this.formElements){
            if(this.formElements[key].validation){
                validity.push(this.formElements[key].validation.valid);
            }
        }

        if(validity.includes(false)){
            this.isFormValid = false;
        }else{
            this.isFormValid = true;
        }

        this.props.inputChangedHandler(this.formElements)
    }
    
    
    render(){
        let inputs = [];
        console.log(this.formElements);
        for(let key in this.formElements){

            if(!this.formElements[key].validation){
                this.invalid = false;
                this.isFormValid = true;
            }else{
                this.invalid = !this.formElements[key].validation.valid;
            }
            inputs.push(<Input 
                        key={key}
                        elementType={this.formElements[key].elementType}
                        type={this.formElements[key].type}
                        placeholder={this.formElements[key].placeholder}
                        value={this.formElements[key].value}
                        label={this.formElements[key].label}
                        options={this.formElements[key].options}
                        onChange={(event) => this.inputChangedHandler(event, key)}
                        invalid={this.invalid}
                        touched={this.formElements[key].touched}
                        />)
        };

        return (
                <form onSubmit={this.props.onSubmit} className="Form">
                    <h4>{ this.props.title }</h4>
                    <hr />
                    { inputs }
                    <Button 
                        disabled={!this.isFormValid}>
                        { this.props.btnTitle }
                    </Button>
                </form>
            )
        }
}

export default Form;



