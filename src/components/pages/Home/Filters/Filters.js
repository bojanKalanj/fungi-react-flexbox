import React, { Component } from "react";

import Form from '../../../../UI/Form/Form';
import Input from '../../../../UI/Form/Input/Input';
import Button from '../../../../UI/Button/Button';

class Filters extends Component{
    state = {
        formFields: {
            formFiledOne: {
                elementType: 'input',
                type: 'text',
                placeholder: 'location',
                value: '',
                label: 'Lokacija na kojoj je pronadjena obzervacija'
            },
            formFiledTwo: {
                elementType: 'input',
                type: 'text',
                placeholder: 'location',
                value: '',
                label: 'Lokacija na kojoj je pronadjena obzervacija'
            },
            formFiledThree: {
                elementType: 'input',
                type: 'text',
                placeholder: 'location',
                value: '',
                label: 'Lokacija na kojoj je pronadjena obzervacija'
            },
            formFiledFour: {
                elementType: 'select',
                type: 'text',
                value: '',
                label: 'Lokacija na kojoj je pronadjena obzervacija',
                options: ["abcd", "akdjals", "lkjsdl"]
            }
        }
    }

    inputChangedHandler = (event, formInput) => {
        let newFormFileds = {...this.state.formFields}
        let newFormInput = newFormFileds[formInput];
        newFormInput.value = event.target.value;
        this.setState({ formFields: newFormFileds });
        console.log(newFormInput.value);
    }

    onFormSubmit = (event) => {
        event.preventDefault()
        console.log(this.state.formFields);
    }

    render(){
        let formElements = {...this.state.formFields};
        let button = {
            btnTitle: "Filter",
            disabled: false
        }

        return (
            <Form 
                formElements={formElements} 
                title="Filteri" 
                onSubmit={(event) => this.onFormSubmit(event)}
                inputChangedHandler={this.inputChangedHandler}
                button={button}>
            </Form>
        )
    }
}

export default Filters;