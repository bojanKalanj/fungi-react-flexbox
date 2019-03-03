import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../../../UI/Form/Form';
import Spinner from '../../../UI/Spinner/Spinner';
import * as actions from '../../../actions';

class ObservationNew extends Component{
    componentDidMount = () => {
        this.props.fetchSpecies();
        this.props.fetchHabitats();

        console.log(this.props.habitatCategories)
        
        let newState = {
            ...this.state.formFields
        }
        // console.log(newState);
        // console.log(this.props.species.data);
        // newState["habitat_categories"].options = ['ksdjalk', 'djaskd'];
        // console.log(newState["habitat_categories"])
        // this.setState({ formFields: newState });
        // console.log(this.state.formFields["habitat_categories"].options)
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
                type: 'text',
                placeholder: 'nalaz uocen',
                value: '',
                label: 'Kada je nalaz uocen',
                validation: {
                    valid: false,
                    required: true
                },
                touched: false
            },
            habitat_categories: {
                elementType: 'select',
                type: 'text',
                value: 'Vrsta',
                label: 'Izaberite vrstu kojoj nalaz pripada',
                options: []
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
        const formElements = {...this.state.formFields};
        // console.log(formElements)
        // console.log(this.props.habitatCategories)

        const renderForm = () => {
            if(!this.props.loadingHabitats){
                // console.log(this.state.formFields["habitat_categories"].options);
                // let newFormFields = { ...this.state.formFields }
                // console.log(newFormFields);
                // newFormFields["habitat_categories"] = this.props.habitatCategories;
                // console.log(newFormFields["habitat_categories"]);
                // this.setState({ formFields: newFormFields })
                // console.log(this.state.formFields["habitat_categories"].options)
                return <Form 
                            formElements={formElements} 
                            title="Dodaj novi nalaz" 
                            onSubmit={(event) => this.onFormSubmit(event)}
                            inputChangedHandler={(data) => this.onInputChanged(data)}
                            btnTitle="Dodaj novi nalaz">
                        </Form>
            }else{
                return <Spinner />
            }
        }
        return(
            <div style={{width: '40%', margin: '0 auto'}}>
                { renderForm() }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        token: state.auth.token,
        species: state.species,
        habitatCategories: state.habitatCategories.habitatCategories,
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