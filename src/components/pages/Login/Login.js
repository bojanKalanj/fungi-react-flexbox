import React, { Component } from 'react';

import Form from '../../../UI/Form/Form';
import { AnchorTag } from '../../../UI/AnchorTag/AnchorTag'

class Login extends Component{
    state = {
        formFields: {
            username: {
                elementType: 'input',
                type: 'text',
                placeholder: 'Vase ime',
                value: '',
                label: 'Ime',
                validation: {
                    valid: false,
                    required: true
                },
                touched: false
            },
            password: {
                elementType: 'input',
                type: 'password',
                placeholder: 'Lozinka',
                value: '',
                label: 'Lozinka',
                validation: {
                    valid: false,
                    required: true
                },
                touched: false
            },
           
        }
    }
    
    checkvalidity = input => {
        if(input.validation.required){
            if(input.value.length >= 1){
                input.validation.valid = true;
            }else{
                input.validation.valid = false;
            } 
        }
    }

    isFormValid = false;

    inputChangedHandler = (event, formInput) => {
        let newFormFileds = {...this.state.formFields}
        let newFormInput = newFormFileds[formInput];
        newFormInput.value = event.target.value;
        newFormInput.touched = true;
        this.checkvalidity(newFormInput);

        let validity = [];

        for(let key in newFormFileds){
            validity.push(newFormFileds[key].validation.valid);
        }

        if(validity.includes(false)){
            this.isFormValid = false;
        }else{
            this.isFormValid = true;
        }

        this.setState({ formFields: newFormFileds });
        console.log(this.isFormValid);
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        console.log("login submited")
    }

    render(){
        let formElements = {...this.state.formFields};
        
        let button = {
            btnTitle: "Prijavi se",
            disabled: !this.isFormValid
        }
        return (
            <div style={{width: '40%', margin: '0 auto'}}>
                <Form 
                    formElements={formElements} 
                    title="Registruj se" 
                    onSubmit={(event) => this.onFormSubmit(event)}
                    inputChangedHandler={this.inputChangedHandler}
                    button={button}>
                </Form>
                <p>Niste registrovani? <span> <AnchorTag to="/register">Registruj se</AnchorTag> </span></p>
            </div>
        )
    }
}

export default Login;



