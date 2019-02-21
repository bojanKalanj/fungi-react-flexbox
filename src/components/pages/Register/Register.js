import React, { Component } from 'react';

import fungi from '../../../apis/fungi';
import Form from '../../../UI/Form/Form';
import { AnchorTag } from '../../../UI/AnchorTag/AnchorTag';

class Register extends Component{
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
            email: {
                elementType: 'input',
                type: 'email',
                placeholder: 'Vas email',
                value: '',
                label: 'Email',
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
            password_confirmation: {
                elementType: 'input',
                type: 'password',
                placeholder: 'Potvrdite lozinku',
                value: '',
                label: 'Potvrda lozinke',
                validation: {
                    valid: false,
                    required: true
                },
                touched: false
            }
        },
        formIsValid: false
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

        let isValid;
        if(validity.includes(false)){
            isValid = false;
        }else{
            isValid = true;
        }

        console.log(validity);
        console.log(isValid);

        this.setState({ formFields: newFormFileds });
        if(isValid){
            this.setState({ formIsValid: isValid });
        }
        console.log(this.state.formIsValid);
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        let user = {}
        for(let key in this.state.formFields){
            user[key] = this.state.formFields[key].value;
        }

        console.log("register!")

        // fungi.post(`/register`, { user })
        // .then(res => {
        //     console.log(res);
        //     console.log(res.data);
        // })
    }

    render(){
        let formElements = {...this.state.formFields};
        
        let button = {
            btnTitle: "Registruj se",
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
                <p>Vec imate nalog? <span> <AnchorTag to="/login">Prijavi se</AnchorTag> </span></p>
            </div>
        )
    }
}

export default Register;



