import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../../../UI/Form/Form';
import Spinner from '../../../UI/Spinner/Spinner';
import * as actions from '../../../actions';

class ObservationNew extends Component{
    componentDidMount = () => {
        this.props.fetchSpecies();
        this.props.fetchHabitats();
    }

    componentWillReceiveProps = (newProps) => {
        if(newProps.state.habitatCategories.habitatCategories){
            let categories = newProps.state.habitatCategories.habitatCategories.data;
            let opts = [];
            for(let key in categories){
                opts = [...opts, { id: categories[key].id, name: categories[key].attributes.name }];
            }
            let newFormFileds = { ...this.state.formFields }
            newFormFileds["habitat_category_id"].options = opts;
            this.setState({ formFields: newFormFileds })
        }
    }

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
                type: 'date',
                placeholder: 'nalaz uocen',
                value: '',
                label: 'Kada je nalaz uocen',
                validation: {
                    valid: false,
                    required: true
                },
                touched: false
            },
            habitat_category_id: {
                elementType: 'select',
                type: 'text',
                value: '',
                label: 'Staniste',
                options: [],
                validation: {
                    valid: false,
                    required: true
                },
                touched: false
            }
        }
    }

    addInput = false;
    removeField = false;

    onInputChanged = data => {
        if(data.habitat_category_id.value === "32"){
                this.addInput = true;
        }
        console.log(data.habitat_category_id.value);
        if(data.habitat_category_id.value !== "32"){
            this.removeField = true;
        }
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
        console.log(observation);
        // this.props.onObservationSubmit(observation, this.props.token);
        
        // fungi.post(`/observations`, { observation })
        // .then(res => {
        //     console.log(res);
        //     console.log(res.data);
        // })
    }

    render(){
        console.log(this.state)
        let formElements = {...this.state.formFields};
        for(let key in this.state.formFields){
            if(this.state.formFields["habitat"]){
                console.log("Form have habitat field");
                this.addInput = false;
            }
        }

        if(this.addInput){
            formElements = {
                ...formElements,
                habitat: {
                    elementType: 'input',
                    type: 'text',
                    placeholder: 'Area',
                    value: '',
                    label: 'Staniste',
                    validation: {
                        valid: false,
                        required: true
                    },
                    touched: false
                }
            }
            this.removeField = false;
        }

        if(this.removeField){
            if(this.state.formFields["habitat"]){
                delete formElements["habitat"];
                // console.log("Form have habitat field");
                this.addInput = false;
            }
        }
        let renderForm = [
            <Form 
                formElements={formElements} 
                title="Dodaj novi nalaz" 
                onSubmit={(event) => this.onFormSubmit(event)}
                inputChangedHandler={(data) => this.onInputChanged(data)}
                btnTitle="Dodaj novi nalaz">
            </Form>
        ]
        console.log(formElements);

        return(
            <div style={{width: '40%', margin: '0 auto'}}>
                { renderForm }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        token: state.auth.token,
        species: state.species,
        habitatCategories: state.habitatCategories,
        loadingHabitats: state.habitatCategories.loading
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onObservationSubmit: (observation, token) => dispatch(actions.newObservation(observation, token)),
        fetchSpecies: () => dispatch(actions.fetchSpecies()),
        fetchHabitats: () => dispatch(actions.fetchHabitats())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ObservationNew);