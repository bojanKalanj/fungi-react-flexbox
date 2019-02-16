import React, { Component } from 'react';

import fungi from '../../../apis/fungi';
import Form from '../../../UI/Form/Form';
import Input from '../../../UI/Form/Input/Input';
import  Button from '../../../UI/Button/Button';

class Register extends Component{
    state = {
        formFields: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Vase ime'
                },
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
                elementConfig: {
                    type: 'email',
                    placeholder: 'Vas email'
                },
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
                elementConfig: {
                    type: 'password',
                    placeholder: 'Lozinka'
                },
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
                elementConfig: {
                    type: 'password',
                    placeholder: 'Potvrdite lozinku'
                },
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

    checkValiditiy = (value, rules) => {
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        const updatedForm = {
            ...this.state.formFields
        }

        const updatedFormElement = {
            ...updatedForm[inputId]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValiditiy(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[inputId] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedForm){
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({formFields: updatedForm, formIsValid: formIsValid});
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        let user = {}
        for(let key in this.state.formFields){
            user[key] = this.state.formFields[key].value;
        }

        fungi.post(`/register`, { user })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.formFields){
            formElementsArray.push({
                id: key,
                config: this.state.formFields[key]
            });
        }
        return (
            <Form onSubmit={this.onFormSubmit} title="Registruj se">
                {formElementsArray.map(formElement => {
                    return <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}  
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            label={formElement.config.label}
                            onChange={(event) => this.inputChangedHandler(event, formElement.id)}
                            invalid={!formElement.config.valid}
                            touched={formElement.config.touched}/>
                })}
                <Button disabled={!this.state.formIsValid}>
                    Registruj se
                </Button>
            </Form>
        )
    }
}

export default Register;



