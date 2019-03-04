import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Form from '../../../UI/Form/Form';
import { AnchorTag } from '../../../UI/AnchorTag/AnchorTag';
import Spinner from '../../../UI/Spinner/Spinner';
import * as actions from '../../../actions';


class Login extends Component{
    state = {
        formFields: {
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
           
        }
    }

    onInputChanged = data => {
        this.setState({ formFields: data })
    }
    
    onFormSubmit = (event) => {
        event.preventDefault();
        const email = this.state.formFields.email.value;
        const password = this.state.formFields.password.value;

        this.props.onAuth(email, password);
    }

    render(){
        let formElements = {...this.state.formFields};
        const loadForm = () => {
            if(this.props.loading){
                return <Spinner />
            }else{
                return <div style={{width: '40%', margin: '0 auto'}}>
                            <Form 
                                formElements={formElements} 
                                title="Uloguj se" 
                                onSubmit={(event) => this.onFormSubmit(event)}
                                inputChangedHandler={(data) => this.onInputChanged(data)}
                                btnTitle="Prijavi se">
                            </Form>
                            <p>Niste registrovani? <span> <AnchorTag to="/register">Registruj se</AnchorTag> </span></p>
                        </div>
            }
        }
       
        return (
            <div>
                {console.log(this.props.state)}
                {loadForm()} 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        loading: state.auth.loading,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);



