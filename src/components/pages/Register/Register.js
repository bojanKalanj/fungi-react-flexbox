import React, { Component } from 'react';
import { connect } from 'react-redux';

import fungi from '../../../apis/fungi';
import * as actions from '../../../actions';
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
        }
    }

    onInputChanged = data => {
        this.setState({ formFields: data })
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        let user = {}
        for(let key in this.state.formFields){
            user[key] = this.state.formFields[key].value;
        }

        this.props.onRegister(user);
        this.props.history.push("/");

        // fungi.post(`/register`, { user })
        // .then(res => {
        //     console.log(res);
        //     console.log(res.data);
        // })
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
                    btnTitle="Registruj se">
                </Form>
                <p>Vec imate nalog? <span> <AnchorTag to="/login">Prijavi se</AnchorTag> </span></p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onRegister: (user) => dispatch(actions.register(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);



