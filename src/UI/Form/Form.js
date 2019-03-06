import React, { Component } from 'react';
import Input from './Input/Input';
import Button from '../Button/Button';

import './Form.css';

class Form extends Component {
    // formElements = {...this.props.formElements};

    // invalid = false;

    // checkvalidity = input => {
    //     if(input.validation){
    //         if(input.validation.required){
    //             if(input.value.length >= 1){
    //                 input.validation.valid = true;
    //             }else{
    //                 input.validation.valid = false;
    //             } 
    //         }
    //     }
    // }

    // isFormValid = false;

    // inputChangedHandler = (event, formInput) => {
    //     let newFormInput = this.formElements[formInput];
    //     newFormInput.value = event.target.value;
    //     newFormInput.touched = true;
    //     this.checkvalidity(newFormInput);

    //     let validity = [];

    //     for(let key in this.formElements){
    //         if(this.formElements[key].validation){
    //             validity.push(this.formElements[key].validation.valid);
    //         }
    //     }

    //     if(validity.includes(false)){
    //         this.isFormValid = false;
    //     }else{
    //         this.isFormValid = true;
    //     }

    //     this.props.inputChangedHandler(this.formElements)
    // }
    
    isFormValid = false;
    
    render(){

        let formElements = {...this.props.formElements};

    let invalid = false;

    const checkvalidity = input => {
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

    // let isFormValid = false;

    const inputChangedHandler = (event, formInput) => {
        let newFormInput = formElements[formInput];
        newFormInput.value = event.target.value;
        newFormInput.touched = true;
        checkvalidity(newFormInput);
        let validity = [];

        for(let key in formElements){
            if(formElements[key].validation){
                validity.push(formElements[key].validation.valid);
            }
        }

        if(validity.includes(false)){
            this.isFormValid = false;
        }else{
            this.isFormValid = true;
        }

        console.log(formElements);
        this.props.inputChangedHandler(formElements);
        console.log(formElements);
        console.log(this.isFormValid);
    }

        let inputs = [];
        for(let key in formElements){

            if(!formElements[key].validation){
                invalid = false;
                this.isFormValid = true;
            }else{
                invalid = !formElements[key].validation.valid;
            }
            inputs.push(<Input 
                        key={key}
                        elementType={formElements[key].elementType}
                        type={formElements[key].type}
                        placeholder={formElements[key].placeholder}
                        value={formElements[key].value}
                        label={formElements[key].label}
                        options={formElements[key].options}
                        onChange={(event) => inputChangedHandler(event, key)}
                        invalid={invalid}
                        touched={formElements[key].touched}
                        />)
        };
        // console.log(formElements);
        // console.log(isFormValid);

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



