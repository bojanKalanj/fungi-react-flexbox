import React, { Component } from 'react';

import fungi from '../../../apis/fungi';

import Form from '../../../UI/Form/Form';
import Input from '../../../UI/Form/Input/Input';
import Button from '../../../UI/Button/Button';

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
                label: 'Lokacija na kojoj je pronadjena obzervacija',
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
                label: 'Opis obzervacije',
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

        let isValid = false;
        if(validity.includes(false)){
            isValid = false;
        }else{
            isValid = true;
        }

        this.setState({ formFields: newFormFileds, formIsValid: isValid });
        console.log(this.state.formIsValid);
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        let observation = {}
        for(let key in this.state.formFields){
            observation[key] = this.state.formFields[key].value;
        }

        // fungi.post(`/observations`, { observation })
        // .then(res => {
        //     console.log(res);
        //     console.log(res.data);
        // })
    }

    render(){
        let formElements = {...this.state.formFields};

        return(
            <Form 
                formElements={formElements} 
                title="Filteri" 
                onSubmit={(event) => this.onFormSubmit(event)}
                inputChangedHandler={this.inputChangedHandler}>
            </Form>
        )
    }
}

export default ObservationNew;