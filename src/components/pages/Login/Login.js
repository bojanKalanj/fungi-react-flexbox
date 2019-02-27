import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../../../UI/Form/Form';
import { AnchorTag } from '../../../UI/AnchorTag/AnchorTag';
import fungi from '../../../apis/fungi';
import * as actions from '../../../actions';


class Login extends Component{
    state = {
        formFields: {
            email: {
                elementType: 'input',
                type: 'text',
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
        // let auth = {};
        const email = this.state.formFields.email.value;
        const password = this.state.formFields.password.value;

        this.props.onAuth(email, password);

        // console.log("login submited")
        // for(let key in this.state.formFields){
        //     auth[key] = this.state.formFields[key].value
        // }

        // fungi.post("/login", { auth })
        // .then(res => {
        //     console.log(res);
        //     console.log(res.data);
        // })
    }

    render(){
        let formElements = {...this.state.formFields};
        console.log(this.props)
        return (
            <div style={{width: '40%', margin: '0 auto'}}>
                <Form 
                    formElements={formElements} 
                    title="Uloguj se" 
                    onSubmit={(event) => this.onFormSubmit(event)}
                    inputChangedHandler={(data) => this.onInputChanged(data)}
                    btnTitle="Prijavi se">
                </Form>
                <p>Niste registrovani? <span> <AnchorTag to="/register">Registruj se</AnchorTag> </span></p>
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
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);



