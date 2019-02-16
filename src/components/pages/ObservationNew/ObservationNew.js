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
                elementConfig: {
                    type: 'text',
                    placeholder: 'Area'
                },
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
                elementConfig: {
                    type: 'text',
                    placeholder: 'location'
                },
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
                elementConfig: {
                    type: 'text',
                    placeholder: 'opis'
                },
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
                elementConfig: {
                    type: 'text',
                    placeholder: 'observed_at'
                },
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
        let observation = {}
        for(let key in this.state.formFields){
            observation[key] = this.state.formFields[key].value;
        }

        console.log(observation);

    //     const observation = {
    //         area: "Pezos", 
    //         location: "Munjin Trg", 
    //         description: "Gljiva je nadjena na obodu Bokijevog anusa slucajno od strane macora koji ga je zaskocio", 
    //         observed_at: "2019-01-25", 
    //         credentials: 'include'
    //    }

        fungi.post(`/observations`, { observation })
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
        return(
            <Form title="Dodaj novu obzervaciju" onSubmit={this.onFormSubmit}>
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
                    Dodaj obzervaciju
                </Button>
            </Form>
        )
    }
}

export default ObservationNew;