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
        console.log("FORM RENDER");
        let formElements = {...this.props.formElements};
        console.log(formElements);
        if(this.props.formElements.habitat_species_ids){
            console.log(this.props.formElements.habitat_species_ids.options)
        }
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

        this.props.inputChangedHandler(formElements);
    }

        let inputs = [];
        for(let key in formElements){

            if(!formElements[key].validation){
                invalid = false;
                this.isFormValid = true;
            }else{
                invalid = !formElements[key].validation.valid;
            }
            inputs.push(<div className={ formElements[key].size }>
                            <Input 
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
                            />
                        </div>)
        };

        return (
                <form onSubmit={this.props.onSubmit} className={ 'Form ' + this.props.columns }>
                    <div className={ 'Form-title ' + this.props.columns }>
                        <h4>{ this.props.title }</h4>
                        <hr />
                    </div>
                    { inputs }
                    <div className="one-col-wide">
                        <Button 
                            border={true}
                            wide={true}>
                            { this.props.btnTitle }
                        </Button>
                    </div>
                </form>
            )
        }
}

export default Form;



