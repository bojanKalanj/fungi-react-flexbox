import React, { Component } from "react";

import Form from '../../../../UI/Form/Form';

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
        }
    }

    onInputChanged = data => {
        this.setState({ formFields: data })
    }

    onFormSubmit = (event) => {
        event.preventDefault()
        console.log(this.state.formFields);
    }

    render(){
        let formElements = {...this.state.formFields};

        return (
            <Form 
                formElements={formElements} 
                title="Filteri" 
                onSubmit={(event) => this.onFormSubmit(event)}
                inputChangedHandler={(data) => this.onInputChanged(data)}
                btnTitle="Filter">
            </Form>
        )
    }
}

export default Filters;