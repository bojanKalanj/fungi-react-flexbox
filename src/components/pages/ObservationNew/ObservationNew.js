import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../../../UI/Form/Form';
import Spinner from '../../../UI/Spinner/Spinner';
import * as actions from '../../../actions';

class ObservationNew extends Component{
    componentDidMount = () => {
        this.props.fetchSpecies();
        this.props.fetchHabitats();
        //     ...this.state.formFields
        // }
        // console.log(newState);
        // console.log(this.props.species.data);
        // newState["habitat_category_id"].options = [this.props.species.data];
        // console.log(newState["habitat_category_id"])
        // this.setState({ formFields: newState });
    }

    componentWillReceiveProps = (newProps) => {
        if(newProps.state.habitatCategories.habitatCategories){
            let categories = newProps.state.habitatCategories.habitatCategories.data;
            let opts = [];
            for(let key in categories){
                // console.log(categories[key].attributes.name)
                opts = [...opts, { id: categories[key].id, name: categories[key].attributes.name }];
            }
            // console.log(names)
            let newFormFileds = { ...this.state.formFields }
            newFormFileds["habitat_category_id"].options = opts;
            // console.log(newFormFileds);
            this.setState({ formFields: newFormFileds })
            // console.log("componentWillReceiveProps", newProps.state.habitatCategories.habitatCategories.data)
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


    onInputChanged = data => {
        if(data.habitat_category_id.value === "32"){
            console.log(data.habitat_category_id.value)
        }
        this.setState({ formFields: data });
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

    renderForm = () => {
        let formElements = {...this.state.formFields};

        if(!this.props.loadingHabitats){
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

    render(){
        return(
            <div style={{width: '40%', margin: '0 auto'}}>
                { this.renderForm() }
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