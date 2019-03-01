import React, { Component } from 'react';
import { connect } from 'react-redux';

import fungi from '../../../apis/fungi';

import Form from '../../../UI/Form/Form';
import * as actions from '../../../actions';

class ObservationNew extends Component{
    state = {
        formFields: {
            area: {
                elementType: 'input',
                type: 'text',
                placeholder: 'Area',
                value: '',
                label: 'Podrucje na kom je nalaz pronadjen',
                validation: {
                    valid: false,
                    required: true
                },
                touched: false
            },
            location: {
                elementType: 'input',
                type: 'text',
                placeholder: 'location',
                value: '',
                label: 'Lokacija na kojoj je nalaz pronadjen',
                validation: {
                    valid: false,
                    required: true
                },
                touched: false
            },
            description: {
                elementType: 'textarea',
                type: 'text',
                placeholder: 'opis',
                value: '',
                label: 'Opis nalaza',
                validation: {
                    valid: false,
                    required: true
                },
                touched: false
            },
            observed_at: {
                elementType: 'input',
                type: 'text',
                placeholder: 'observed_at',
                value: '',
                label: 'Kada je nalaz uocen',
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
        let observation = {}
        for(let key in this.state.formFields){
            observation[key] = this.state.formFields[key].value;
        }

        console.log("submited");
        console.log(this.props.token);
        this.props.onObservationSubmit(observation, this.props.token);
        
        // fungi.post(`/observations`, { observation })
        // .then(res => {
        //     console.log(res);
        //     console.log(res.data);
        // })
    }

    render(){
        let formElements = {...this.state.formFields};
        return(
            <div style={{width: '40%', margin: '0 auto'}}>
                <Form 
                    formElements={formElements} 
                    title="Dodaj novi nalaz" 
                    onSubmit={(event) => this.onFormSubmit(event)}
                    inputChangedHandler={(data) => this.onInputChanged(data)}
                    btnTitle="Dodaj novi nalaz">
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onObservationSubmit: (observation, token) => dispatch(actions.newObservation(observation, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ObservationNew);