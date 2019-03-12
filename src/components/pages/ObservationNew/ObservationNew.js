import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../../../UI/Form/Form';
import Spinner from '../../../UI/Spinner/Spinner';
import Button from '../../../UI/Button/Button';
import * as actions from '../../../actions';
import Input from '../../../UI/Form/Input/Input';
import './ObservationNew.css';
import MultiselectDropdown from '../../../UI/Form/Multiselect/Multiselect';

class ObservationNew extends Component{
    componentDidMount = () => {
        this.props.fetchSpecies();
        this.props.fetchHabitats();
        this.props.floralSpecies();
    }

    componentWillReceiveProps = newProps => {
        if(newProps.state.habitatCategories.habitatCategories){
            let categories = newProps.state.habitatCategories.habitatCategories.data;
            let opts = [];
            for(let key in categories){
                opts = [...opts, { id: categories[key].id, name: categories[key].attributes.name }];
            }
            let newFormFileds = { ...this.state.formFields }
            newFormFileds["habitat_category_id"].options = opts;
            this.setState({ formFields: newFormFileds, habitatCategories: categories })
        }

        if(newProps.floralspecies.floralSpecies){
            let floralSpecies = newProps.floralspecies.floralSpecies.data;
            this.setState({ floralSpecies: floralSpecies });
        }
    }
    state = {
        formFields: {
            area: {
                elementType: 'input',
                type: 'text',
                placeholder: 'Petrovaradin',
                value: '',
                label: 'Područje na kojem je nalaz pronadjen *',
                validation: {
                    valid: false,
                    required: true
                },
                touched: false
            },
            location: {
                elementType: 'input',
                type: 'text',
                placeholder: 'Tvrdjava',
                value: '',
                label: 'Lokacija na kojoj je nalaz pronadjen *',
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
                label: 'Opis nalaza *',
                validation: {
                    valid: false,
                    required: true
                },
                touched: false,
                size: 'two-col-wide'
            },
            observed_at: {
                elementType: 'input',
                type: 'date',
                placeholder: 'nalaz uocen',
                value: '',
                label: 'Kada je nalaz uočen',
                validation: {
                    valid: false,
                    required: true
                },
                touched: false,
                size: 'one-col-wide'
            },
            habitat_category_id: {
                elementType: 'select',
                type: 'text',
                value: '',
                label: 'Stanište',
                options: [],
                validation: {
                    valid: false,
                    required: true
                },
                touched: false,
                size: 'one-col-wide'
            }
        },
        floralSpecies: null,
        habitatCategories: null,
        selectedFloralSpecies: null,
        habitat_note: {
            elementType: 'textarea',
            type: 'text',
            placeholder: 'Napomena',
            value: '',
            label: 'Unesite naopmenu',
            validation: {
                valid: false,
                required: true
            },
            touched: false,
            startingName: "Staniste"
        },
        habitatSpeciesIds: {
            show: false,
            value: null,
            options: null
        }
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        let observation = {}
        for(let key in this.state.formFields){
            observation[key] = this.state.formFields[key].value;
        }

        if(this.state.habitatSpeciesIds.show){
            console.log(this.state.habitatSpeciesIds.value);
            observation["habitat_species_ids"] = this.state.habitatSpeciesIds.value; 
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

    addInputToFileds = input => {
        let formFields = null;
        if(input === "habitat_note"){
            let habitat_note = { ...this.state.habitat_note };
            formFields = {
                ...this.state.formFields,
                habitat_note
            }
        }
        
        this.setState({ formFields: formFields });
    }

    removeInputFromFields = input => {
        let formFields = { ...this.state.formFields };
        delete formFields[input];
        this.setState({ formFields: formFields });
    } 

    onInputChanged = (event, input) => {
        let formFields = { ...this.state.formFields };
        formFields[input].value = event.target.value;
        this.setState({ formFields: formFields });
        let habitatNoteAdded = true;
        if(event.target.value === "32" && habitatNoteAdded && input === "habitat_category_id"){
            this.addInputToFileds("habitat_note")
            habitatNoteAdded = true;
        }else if(event.target.value !== "32" && input === "habitat_category_id"){
            habitatNoteAdded = false;
            this.removeInputFromFields("habitat_note");
            this.setFloralSpecies(event.target.value);
        }
    }

    setFloralSpecies = habitatID => {
        let habitats = { ...this.state.habitatCategories };
        let floralSpecies = { ...this.state.floralSpecies };
        let selectedHabitat = [];
        let selectedFloralIds = null;
        let selectedFloral = [];
        for(let key in habitats){
            if(habitats[key].id === habitatID){
                selectedHabitat = habitats[key];
            }
        }

        let habitatSpeciesIds = { ...this.state.habitatSpeciesIds };
        let formFields = { ...this.state.formFields };

        if(selectedHabitat.attributes.floral_species_ids.length > 0){
            let habitat_species_ids = { ...this.state.habitatSpeciesIds };
            formFields = {
                ...formFields,
                habitat_species_ids
            }
            selectedFloralIds = selectedHabitat.attributes.floral_species_ids;
            for(let floralSpecimen in floralSpecies){
                for(let id in selectedFloralIds){
                    if(floralSpecies[floralSpecimen].id.includes(selectedFloralIds[id])){
                        selectedFloral.push(floralSpecies[floralSpecimen]); 
                    }
                }
            }
            let options = [];
            for(let key in selectedFloral){
                options.push(
                    { name: selectedFloral[key].attributes.name, value: selectedFloral[key].id }
                )
            }
            habitatSpeciesIds.options = options;
            habitatSpeciesIds.show = true;
            this.setState({ habitatSpeciesIds: habitatSpeciesIds });
        }else{
            habitatSpeciesIds.show = false;
            this.setState({ habitatSpeciesIds: habitatSpeciesIds });
        }
    }

    onSelectOptions = value => {
        let habitatSpeciesIds = { ...this.state.habitatSpeciesIds };
        habitatSpeciesIds.value = value;
        this.setState({ habitatSpeciesIds: habitatSpeciesIds })
    }

    habitatSpeciesIds = () => {
        if(this.state.habitatSpeciesIds.show){

            return <MultiselectDropdown options={this.state.habitatSpeciesIds.options} onSelectOptions={this.onSelectOptions}/>
        }else{
            return null;
        }
    }

    generateInput = (input, inputName) => {
        return (
            <Input
                elementType={input.elementType}
                type={input.type}
                placeholder={input.placeholder}
                value={input.value}
                label={input.label}
                options={input.options}
                onChange={(event) => this.onInputChanged(event, inputName)}
                // invalid={invalid}
                touched={input.touched} 
                />
        )
    }

    render(){
        return(
            <form onSubmit={this.onFormSubmit} className="ObservationNew">
                <div className="form-row">
                    <div className="half-width">
                        { this.generateInput(this.state.formFields.area, "area") }
                    </div>
                    <div className="half-width">
                        { this.generateInput(this.state.formFields.location, "location") }
                    </div>
                </div>
                <div className="form-row">
                    <div className="half-width">
                        { this.generateInput(this.state.formFields.description, "description") }
                    </div>
                    <div className="half-width">
                        { this.generateInput(this.state.formFields.observed_at, "observed_at") }
                    </div>
                </div>
                <div className="form-row">
                    <div className="half-width">
                        { this.generateInput(this.state.formFields.habitat_category_id, "habitat_category_id") }
                    </div>
                    <div className="half-width">
                        { this.habitatSpeciesIds() }
                    </div>
                </div>
                <Button>
                    Dodaj nalaz
                </Button>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state,
        token: state.auth.token,
        species: state.species,
        floralspecies: state.floralspecies,
        habitatCategories: state.habitatCategories,
        loadingHabitats: state.habitatCategories.loading
    };
};

const mapDispatchToProps = dispatch => {
    return{
        onObservationSubmit: (observation, token) => dispatch(actions.newObservation(observation, token)),
        fetchSpecies: () => dispatch(actions.fetchSpecies()),
        fetchHabitats: () => dispatch(actions.fetchHabitats()),
        floralSpecies: () => dispatch(actions.floralSpecies())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ObservationNew);