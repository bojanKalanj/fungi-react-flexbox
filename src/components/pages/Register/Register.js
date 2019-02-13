import React, { Component } from 'react';

import Form from '../../../UI/Form/Form';
import Input from '../../../UI/Form/Input/Input';
import  Button from '../../../UI/Button/Button';

class Register extends Component{
    state = {
        formFields: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Vase ime'
                },
                value: '',
                label: 'Ime'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Vas email'
                },
                value: '',
                label: 'Email'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Lozinka'
                },
                value: '',
                label: 'Lozinka'
            },
            confirmPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Potvrdite lozinku'
                },
                value: '',
                label: 'Potvrda lozinke'
            }
        }
    }

    onInputChangedHandler = (event, inputId) => {
        console.log(event.target.value)
        const updatedForm = {
            ...this.state.formFields
        }

        const updatedFormElement = {
            ...updatedForm[inputId]
        }

        updatedFormElement.value = event.target.value;
        updatedForm[inputId] = updatedFormElement;
        this.setState({formFields: updatedForm});
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
            <Form title="Registruj se">
                {formElementsArray.map(formElement => {
                    return <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType}  
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            label={formElement.config.label}
                            onChange={(event) => this.onInputChangedHandler(event, formElement.id)}/>
                })}
                {/* <Input label="Ime" placeholder="Vase ime"/>
                <Input label="Email" placeholder="Vas email"/>
                <Input label="Lozinka" placeholder="Lozinka"/>
                <Input label="Potvrdi lozinku" placeholder="Lozinka"/> */}
                <Button>
                    Registruj se
                </Button>
            </Form>
        )
    }
}

export default Register;



