import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../../../UI/Form/Form';
import Spinner from '../../../UI/Spinner/Spinner';
import Button from '../../../UI/Button/Button';
import * as actions from '../../../actions';
import Input from '../../../UI/Form/Input/Input';
import MultiSelectDropdown from '../../../UI/Form/MultiSelectDropdown/MultiSelectDropdown';
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
            },
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
                show: false
            },
            habitatSpeciesIds: {
                value: null,
                options: null,
                selected: false
            }
        },
    }

    showHabitatNote = false;
    includedFloralSpecies = null;
    showFloralSpecies = false;
    onInputChanged = (event, inputName) => {
        let formFields = { ...this.state.formFields };
        formFields[inputName].value = event.target.value;
        this.setState({ formFields: formFields });
        if(inputName === "habitat_category_id" && event.target.value === "32"){
            this.showHabitatNote = true;
            this.showFloralSpecies = false;
        }else if(inputName === "habitat_category_id" && event.target.value !== "32"){
            this.showHabitatNote = false;
            this.setFloralSpecies(event.target.value);
        }
    }

    // includedFloralSpecies = null;
    // showFloralSpecies = false;
    setFloralSpecies = (value) => {
        // console.log(value);
        let allHabitats = this.props.habitatCategories.habitatCategories.data;
        let selectedHabitat = null;
        let allFloralSpecies = this.props.floralspecies.floralSpecies.data;
        let includedFloralSpecies = [];
        for(let habitat in allHabitats){
            if(allHabitats[habitat].id === value){
                selectedHabitat = allHabitats[habitat];
            }
        }

        for(let floralSpecimen in selectedHabitat.attributes.floral_species_ids){
            for(let id in allFloralSpecies){
                if(selectedHabitat.attributes.floral_species_ids[floralSpecimen] === allFloralSpecies[id].id){
                    includedFloralSpecies.push(allFloralSpecies[id]);
                }
            }
        }
        this.includedFloralSpecies = includedFloralSpecies;
        for(let includedSpecimen in this.includedFloralSpecies){
            this.includedFloralSpecies[includedSpecimen]["selected"] = false
        }
        console.log(this.includedFloralSpecies);
        if(this.includedFloralSpecies.length > 0){
            let formFields = { ...this.state.formFields };
            formFields["habitatSpeciesIds"].options = includedFloralSpecies;
            // console.log(formFields["habitatSpeciesIds"].options);
            this.setState({ formFields: formFields });
            console.log(this.state.formFields.habitatSpeciesIds);
            this.showFloralSpecies = true;
            this.showHabitatNote = false;
        }

        if(this.includedFloralSpecies.length === 0){
            this.showFloralSpecies = false;
        }
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        let observation = {}
        for(let key in this.state.formFields){
            observation[key] = this.state.formFields[key].value;
        }

        if(this.state.formFields.habitatSpeciesIds.show){
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

    toggleSelected = (id) => {
        console.log(id);
    }

    render(){
        console.log(this.showFloralSpecies)
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
                        { this.showHabitatNote? this.generateInput(this.state.formFields.habitat_note, "habitat_note"): null }
                    {this.showFloralSpecies? <MultiSelectDropdown
                                                title="Izaberi biljnu vrstu"
                                                list={this.state.formFields.habitatSpeciesIds.options}
                                                toggleItem={this.toggleSelected}
                                                />: null}
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