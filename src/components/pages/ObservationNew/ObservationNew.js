import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../../../UI/Form/Form';
import Spinner from '../../../UI/Spinner/Spinner';
import Button from '../../../UI/Button/Button';
import * as actions from '../../../actions';
import Input from '../../../UI/Form/Input/Input';
import './ObservationNew.css';

class ObservationNew extends Component{
    componentDidMount = () => {
        this.props.fetchSpecies();
        this.props.fetchHabitats();
        this.props.floralSpecies();
    }

    componentWillReceiveProps = newProps => {
        console.log(this.props.habitatCategories);
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

    // componentWillReceiveProps = (newProps) => {
    //     if(newProps.state.habitatCategories.habitatCategories){
    //         let categories = newProps.state.habitatCategories.habitatCategories.data;
    //         let opts = [];
    //         for(let key in categories){
    //             opts = [...opts, { id: categories[key].id, name: categories[key].attributes.name }];
    //         }
    //         let newFormFileds = { ...this.state.formFields }
    //         newFormFileds["habitat_category_id"].options = opts;
    //         this.setState({ formFields: newFormFileds })
    //     }

    //     if(this.props.floralspecies.floralSpecies){
    //         this.setState({ floralSpecies: this.props.floralspecies.floralSpecies.data })
    //     }
    // }

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
    }

    // addHabitatNoteInput = false;
    // removeHabitatNoteInput = false;
    // addFloralSpeciesInput = false;
    // removeFloralSpeciesInput = false;

    // includedfloralSpecies = [];

    // setFloralSpecies = (habitatCategorieValue) => {
    //     let habitatCategories = this.props.habitatCategories.habitatCategories.data;
    //     let selectedHabitatCategorie = null;
    //     let floralSpecies = { ...this.state.floralSpecies };
    //     let includedfloralSpecies = [];
    //     for(let habitatCategorie in habitatCategories){
    //         if(habitatCategories[habitatCategorie].id === habitatCategorieValue){
    //             selectedHabitatCategorie = habitatCategories[habitatCategorie];
    //         }
    //     }
        
    //     let ids = selectedHabitatCategorie.attributes.floral_species_ids;
    //     for(let id in ids){
    //         ids[id] = Number(ids[id])
    //     }

    //     console.log(ids.length);
    //                 this.addFloralSpeciesInput = true;

    //     if(ids.length !== 0){
    //         console.log("STA SE DESAVA!!??")
    //         this.removeFloralSpeciesInput = false;
    //         for(let floralSpecimen in floralSpecies){
    //             console.log("KJLKJDLKJ")
    //             console.log(floralSpecies[floralSpecimen].id);
    //             if(ids.includes(Number(floralSpecies[floralSpecimen].id))){
    //                 includedfloralSpecies.push({name: floralSpecies[floralSpecimen].attributes.name, id: floralSpecies[floralSpecimen].id})
    //                 // this.addFloralSpeciesInput = true;
    //                 this.includedfloralSpecies = includedfloralSpecies;
    //             }
    //         }
    //     }

    //     if(ids.length === 0){
    //         this.addFloralSpeciesInput = false;
    //         this.removeFloralSpeciesInput = true;
    //     }
    // }

    // onInputChanged = data => {
    //     if(data.habitat_category_id.value){
    //         this.setFloralSpecies(data.habitat_category_id.value)
    //     }
        
    //     if(data.habitat_category_id.value === "32"){
    //         this.addHabitatNoteInput = true;
    //     }

    //     if(data.habitat_category_id.value !== "32"){
    //         this.removeHabitatNoteInput = true;
    //     }
    //     console.log(data);
    //     this.setState({ formFields: data }) 
    // }

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

    onInputChanged = (event, input) => {
        let formFields = { ...this.state.formFields };
        formFields[input].value = event.target.value;
        this.setState({ formFields: formFields });
    }

    renderForm = (fileds) => {
        let formFields = fileds || { ...this.state.formFields };
        let inputs = [];
        for(let key in formFields){
            inputs.push( <Input elementType={formFields[key].elementType}
                                type={formFields[key].type}
                                value={formFields[key].value}
                                onChange={event => this.onInputChanged(event, key)}
                                placeholder={formFields[key].placeholder}
                                options={formFields[key].options}
                                label={formFields[key].label}/>
            )
        }
        return inputs;
    }

    render(){
        // console.log(this.addFloralSpeciesInput)
        // let formElements = {...this.state.formFields};
        // for(let key in this.state.formFields){
        //     if(this.state.formFields["habitat_note"]){
        //         this.addHabitatNoteInput = false;
        //     }
        // }    

        //     if(this.state.formFields["habitat_species_ids"]){
        //         console.log(formElements["habitat_species_ids"].options);
        //         console.log(this.includedfloralSpecies);
        //     }
        // }

        // if(this.addHabitatNoteInput){
        //     formElements = {
        //         ...formElements,
        //         habitat_note: {
        //             elementType: 'textarea',
        //             type: 'text',
        //             placeholder: 'Napomena',
        //             value: '',
        //             label: 'Unesite naopmenu',
        //             validation: {
        //                 valid: false,
        //                 required: true
        //             },
        //             touched: false,
        //             startingName: "Staniste"
        //         }
        //     }
        //     this.removeHabitatNoteInput = false;
        // }

        // if(this.removeHabitatNoteInput){
        //     if(this.state.formFields["habitat_note"]){
        //         delete formElements["habitat_note"];
        //         this.addHabitatNoteInput = false;
        //     }
        // }

        // let options = this.includedfloralSpecies;
        // let value = 'moj kurac'
        // if(this.state.formFields.habitat_species_ids){
        //     console.log(this.state.formFields.habitat_species_ids.value)
        //     value = this.state.formFields.habitat_species_ids.value;
        // } 
        
        // console.log(options);
        // if(this.addFloralSpeciesInput){
        //     formElements = {
        //         ...formElements,
        //         habitat_species_ids: {
        //             elementType: 'select',
        //             type: 'text',
        //             value: value,
        //             label: 'Biljna vrsta',
        //             options: options,
        //             validation: {
        //                 valid: false,
        //                 required: true
        //             },
        //             touched: false
        //         }
        //     }
        // }

        // if(this.removeFloralSpeciesInput){
        //     if(this.state.formFields["habitat_species_ids"]){
        //         delete formElements["habitat_species_ids"];
        //         this.addFloralSpeciesInput = false;
        //     }
        // }
        // let renderForm = [
        //     <Form 
        //         formElements={formElements} 
        //         title="Dodaj novi nalaz" 
        //         onSubmit={(event) => this.onFormSubmit(event)}
        //         inputChangedHandler={(data) => this.onInputChanged(data)}
        //         btnTitle="Kreiraj nalaz"
        //         columns="col-2">
        //     </Form>
        // ]

        return(
            <form onSubmit={this.onFormSubmit} className="ObservationNew">
                {this.renderForm()}
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