import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import { connect } from 'react-redux';
// import fetchHabitats from '../../../actions';
import * as actions from '../../../actions';
import MultiSelectDropdown from '../../../UI/Form/MultiSelectDropdown/MultiSelectDropdown';
import Autosuggest from '../../../UI/Form/Autosuggest/Autosuggest';
import '../../../UI/Form/Input/Input';
import '../../../UI/Button/Button';
import { formValueSelector } from 'redux-form';

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <div className="input-error"><span>{error}</span></div> : false

class ObservationFormSecondPage extends Component{
  state = {
    showHabitatNote: false,
    showFloralSpeciesForHabitats: false,
    showFloralSpeciesForSubstrates: false,
    showSubstrateNote: false,
    habitatCategories: {
        value: [],
        options: null,
        selected: null
    },
    substrateCategories: {
      value: [],
      options: null,
      selected: null
    }
  }
  componentWillMount = () => {
    this.props.fetchHabitats();
    this.props.floralSpecies();
    this.props.fetchSubstrate();
    this.props.fetchSpecies();
    
    if(this.props.state.habitatCategories.habitatCategories && this.habitats.length === 0){
      const habitatCategories = this.props.state.habitatCategories.habitatCategories.data;
      for(let habitatCategorie in habitatCategories ){
        this.habitats.push(habitatCategories[habitatCategorie]); 
      }
    }
    if(this.props.state.substrate.substrate && this.substrates.length === 0){
      const substrate = this.props.state.substrate.substrate.data;
      for(let sub in substrate ){
        this.substrates.push(substrate[sub]); 
      }
    }

    const selector = formValueSelector('observationForm');
    const habitatValue = selector(this.props.state, 'habitat_category_id');
    const substrateValue = selector(this.props.state, 'substrate_category_id');
    
    if(habitatValue){
      this.setFloralSpecies(habitatValue, "habitat");
    }

    if(substrateValue){
      this.setFloralSpecies(substrateValue, "substrate");
    }
  }

  habitats = [];
  substrates = [];
  componentWillReceiveProps = newProps => {
    if(newProps.state.habitatCategories.habitatCategories && this.habitats.length === 0){
      const habitatCategories = newProps.state.habitatCategories.habitatCategories.data;
      for(let habitatCategorie in habitatCategories ){
        this.habitats.push(habitatCategories[habitatCategorie]); 
      }
    }

    if(newProps.state.substrate.substrate && this.substrates.length === 0){
      const substrate = newProps.state.substrate.substrate.data;
      for(let sub in substrate ){
        this.substrates.push(substrate[sub]); 
      }
    }
    
  }

  onSelectedHabitat = (event) => {
    const value = event.target.value;
    if(value === "32"){
      this.props.change("habitat_species_ids", null);
      this.setState({
        showHabitatNote: true, 
        showFloralSpeciesForHabitats: false 
      });
    }else if(value !== "32"){
      this.setState({ showHabitatNote: false });
      this.setFloralSpecies(value, "habitat");
    }
  }

  onSelectedSubstrate = (event) => {
    const value = event.target.value;
    if(value === "22"){
      this.props.change("substrates_species_ids", null);
      this.setState({ 
          showSubstrateNote: true, 
          showFloralSpeciesForSubstrates: false 
      });
    }else{
      this.setState({ showSubstrateNote: false });
      this.setFloralSpecies(value, "substrate");
    }
  }

  setFloralSpecies = (value, on) => {
    let allFloralSpecies = this.props.floralspecies.floralSpecies.data;
    let includedFloralSpecies = [];

    let allHabitats = this.habitats;

    let allSubstrates = this.substrates;

    let selected = null;

    if(on === 'habitat'){
      for(let habitat in allHabitats){
        if(allHabitats[habitat].id === value){
          selected = allHabitats[habitat];
        }
      }
    }

    if(on === "substrate"){
      for(let substrate in allSubstrates){
        if(allSubstrates[substrate].id === value){
          selected = allSubstrates[substrate];
        }
      }
    }

    console.log(selected)

    for(let s in selected.attributes.floral_species_ids){
        for(let id in allFloralSpecies){
            if(selected.attributes.floral_species_ids[s] === allFloralSpecies[id].id){
                includedFloralSpecies.push(allFloralSpecies[id]);
            }
        }
    }
    
    if(on === "habitat" && includedFloralSpecies.length > 0){
      let habitatCategories = { ...this.state.habitatCategories };
      habitatCategories.options = [...includedFloralSpecies];
      this.setState({ habitatCategories: habitatCategories, showFloralSpeciesForHabitats: true })
    }else if(on === "habitat" && includedFloralSpecies.length === 0){
      let habitatCategories = { ...this.state.habitatCategories };
      habitatCategories.options = null;
      // console.log("habitatCategories: ", habitatCategories)
      this.setState({ habitatCategories: habitatCategories, showFloralSpeciesForHabitats: false })
    }

    if(on === "substrate" && includedFloralSpecies.length > 0){
      let substrateCategories = { ...this.state.substrateCategories };
      substrateCategories.options = [...includedFloralSpecies];
      this.setState({ substrateCategories: substrateCategories, showFloralSpeciesForSubstrates: true })
    }else if(on === "substrate" && includedFloralSpecies.length === 0){
      let substrateCategories = { ...this.state.substrateCategories };
      substrateCategories.options = null;
      this.setState({ substrateCategories: substrateCategories, showFloralSpeciesForSubstrates: false })
    }
    
  }

  renderHabitatSelector = ({ input, meta: { touched, error } }) => (
    <div>
      <select {...input}>
        <option value="">Izaberite opciju</option>
        {this.habitats.map((habitat, index) => (
          <option value={habitat.id} key={index}>
            {habitat.attributes.name}
          </option>
        ))}
      </select>
      {touched && error && <span>{error}</span>}
    </div>
  );

  renderSubstrateSelector = ({ input, meta: { touched, error } }) => (
    <div>
      <select {...input}>
        <option value="">Izaberite opciju</option>
        {this.substrates.map((substrate, index) => (
          <option value={substrate.id} key={index}>
            {substrate.attributes.name}
          </option>
        ))}
      </select>
      {touched && error && <span>{error}</span>}
    </div>
  );

  handleSelectionForHabitats = (selectedValue) => {
    console.log(selectedValue);
    const value = selectedValue.id;
    let habitatCategories = { ...this.state.habitatCategories };
    if(habitatCategories.value.includes(value)){
      const index = habitatCategories.value.indexOf(value);

      if (index !== -1) {
        habitatCategories.value.splice(index, 1);
      }
    }else{
      habitatCategories.value.push(value);
    }
    this.setState({ habitatCategories: habitatCategories });
    this.props.sendDropdownDataToRedux(habitatCategories.value, "DROPRDOWN_DATA_FOR_HABITATS");
    this.props.change("habitat_species_ids", this.state.habitatCategories.value);
  }

  handleSelectionForSubstrates = (selectedValue) => {
    const value = selectedValue.id;
    let substrateCategories = { ...this.state.substrateCategories };
    if(substrateCategories.value.includes(value)){
      const index = substrateCategories.value.indexOf(value);

      if (index !== -1) {
        substrateCategories.value.splice(index, 1);
      }
    }else{
      substrateCategories.value.push(value);
    }
    this.setState({ substrateCategories: substrateCategories });
    this.props.sendDropdownDataToRedux(substrateCategories.value, "DROPRDOWN_DATA_FOR_SUBSTRATES");
    this.props.change("substrates_species_ids", this.state.substrateCategories.value);
  }

  renderSpeciesAutosuggest = () => {
    let suggestions = [];
    if(this.props.state.species.data){
      let species = this.props.state.species.data.data; 
      for(let specimen in species){
        suggestions.push(species[specimen].attributes.name);
      }
    }
    return <Autosuggest label="Vrsta" suggestions={suggestions}/>
  }

  render(){
    // if(this.props.state.species.data){
    //   let species = this.props.state.species.data.data; 
    //   let speciesNames = [];
    //   for(let specimen in species){
    //     speciesNames.push(species[specimen].attributes.name);
    //   }
    // }
    const { handleSubmit, previousPage } = this.props;
      return (
        <form onSubmit={handleSubmit} className="ObservationNew form-small">
          <div className="Form-title">
            <h4>Dodaj Nalaz</h4>
            <hr />
          </div>
            { this.renderSpeciesAutosuggest() }
          <div className="Input">
            <label>Stanište</label>
            <Field 
              onChange={(event) => this.onSelectedHabitat(event)}
              name="habitat_category_id"
              component={this.renderHabitatSelector} />
          </div>
          {this.state.showHabitatNote? <div className="Input">
            <label>Napomena *</label>
            <div>
              <Field 
                name="habitat_note" 
                component="textarea" />
            </div>
              <Field 
                name="habitat_note" 
                component={renderError} />
          </div>: null}
          {this.state.showFloralSpeciesForHabitats? <div className="Input">
            <label>Biljne vrste za stanište</label>
            <div>
              <MultiSelectDropdown
                title="Izaberi biljnu vrstu"
                list={this.state.habitatCategories.options}
                toggleItem={this.handleSelectionForHabitats}
                selected={this.props.state.dropdownData.dataForHabitat}
              />
            </div>
          </div>: null}
          <div className="Input">
            <label>Opis nalaza *</label>
            <div>
              <Field 
                name="description" 
                component="textarea" />
            </div>
            <Field 
              name="description" 
              component={renderError} />
          </div>
          <div className="Input">
            <label>Podloga</label>
            <Field 
              onChange={(event) => this.onSelectedSubstrate(event)}
              name="substrate_category_id"
              component={this.renderSubstrateSelector} />
          </div>
          {this.state.showFloralSpeciesForSubstrates? <div className="Input">
            <label>Biljne vrste za podlogu</label>
            <div>
              <MultiSelectDropdown
                title="Izaberi biljnu vrstu"
                list={this.state.substrateCategories.options}
                toggleItem={this.handleSelectionForSubstrates}
                selected={this.props.state.dropdownData.dataForSubstrate}
              />
            </div>
          </div>: null}
          {this.state.showSubstrateNote? <div className="Input">
            <label>Specifična podloga *</label>
            <div>
              <Field 
                name="substrate_note" 
                component="textarea" />
            </div>
              <Field 
                name="substrate_note" 
                component={renderError} />
          </div>: null}
          <div>
            <button 
              type="button" 
              className="previous Button" 
              onClick={previousPage}>
                Vrati se
            </button>
            <button 
              type="submit" 
              className="next Button">
                Nastavi
            </button>
          </div>
        </form>
      )
  }
}

const mapStateToProps = (state) => {
  return{
    state: state,
    habitatCategories: state.habitatCategories,
    floralspecies: state.floralspecies,
    substrate: state.substrate
  }
}

const mapDispatchToProps = dispatch => {
      return{
          onObservationSubmit: (observation, token) => dispatch(actions.newObservation(observation, token)),
          fetchSpecies: () => dispatch(actions.fetchSpecies()),
          fetchHabitats: () => dispatch(actions.fetchHabitats()),
          floralSpecies: () => dispatch(actions.floralSpecies()),
          fetchSubstrate: () => dispatch(actions.fetchSubstrate()),
          sendDropdownDataToRedux: (data, type) => dispatch(actions.dropData(data, type))
      };
  };
  

const wrappedForm = reduxForm({
  form: 'observationForm', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(ObservationFormSecondPage);

export default connect(mapStateToProps, mapDispatchToProps)(wrappedForm)