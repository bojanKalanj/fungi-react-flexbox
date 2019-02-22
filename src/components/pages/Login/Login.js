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

    onInputChanged = data => {
        this.setState({ formFields: data })
    }
    
    onFormSubmit = (event) => {
        event.preventDefault();
        console.log("login submited")
    }

    render(){
        let formElements = {...this.state.formFields};
        
        return (
            <div style={{width: '40%', margin: '0 auto'}}>
                <Form 
                    formElements={formElements} 
                    title="Registruj se" 
                    onSubmit={(event) => this.onFormSubmit(event)}
                    inputChangedHandler={(data) => this.onInputChanged(data)}
                    btnTitle="Prijavi se">
                </Form>
                <p>Niste registrovani? <span> <AnchorTag to="/register">Registruj se</AnchorTag> </span></p>
            </div>
        )
    }
}

export default Login;



