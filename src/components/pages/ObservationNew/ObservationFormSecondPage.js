import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import { connect } from 'react-redux';
// import fetchHabitats from '../../../actions';
import * as actions from '../../../actions';
import MultiSelectDropdown from '../../../UI/Form/MultiSelectDropdown/MultiSelectDropdown';
import '../../../UI/Form/Input/Input';
import '../../../UI/Button/Button';

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <div className="input-error"><span>{error}</span></div> : false

class ObservationFormSecondPage extends Component{
  state = {
    // showHabitatNote: false,
    // showSubstrateNote: false,
    habitatSpeciesIds: {
        value: null,
        options: null,
        selected: false
    }
  }
  componentDidMount = () => {
    this.props.fetchHabitats();
    this.props.floralSpecies();
    this.props.fetchSubstrate();
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
      this.setState({ showHabitatNote: true });
    }else if(value !== "32"){
      this.setState({ showHabitatNote: false });
      this.setFloralSpecies(value, "habitat");
    }
  }

  onSelectedSubstrate = (event) => {
    const value = event.target.value;
    if(value === "22"){
      this.setState({ showSubstrateNote: true });
    }else{
      this.setState({ showSubstrateNote: false });
      this.setFloralSpecies(value, "substrate");
    }
  }

  includedFloralSpecies = null;
  showFloralSpecies = false;
  showSubstrateNote = false;
  setFloralSpecies = (value, on) => {
    let setOn = null;
    if(on === "habitat"){
      setOn = this.props.habitatCategories.habitatCategories.data;
    }

    if(on === "substrate"){
      setOn = this.props.substrate.substrate.data;
    }
    // let allHabitats = this.props.habitatCategories.habitatCategories.data;
    let selected = null;
    let allFloralSpecies = this.props.floralspecies.floralSpecies.data;
    let includedFloralSpecies = [];
    for(let on in setOn){
        if(setOn[on].id === value){
            selected = setOn[on];
        }
    }

    for(let floralSpecimen in selected.attributes.floral_species_ids){
        for(let id in allFloralSpecies){
            if(selected.attributes.floral_species_ids[floralSpecimen] === allFloralSpecies[id].id){
                includedFloralSpecies.push(allFloralSpecies[id]);
            }
        }
    }
    this.includedFloralSpecies = includedFloralSpecies;

    for(let includedSpecimen in this.includedFloralSpecies){
        this.includedFloralSpecies[includedSpecimen]["selected"] = false
    }
    if(this.includedFloralSpecies.length > 0){
        let habitatSpeciesIds = { ...this.state.habitatSpeciesIds };
        habitatSpeciesIds.options = includedFloralSpecies;
        this.setState({ habitatSpeciesIds: habitatSpeciesIds });
        // if(on === "habitat"){
          this.showFloralSpecies = true;
          this.showHabitatNote = false;
        // }

        // if(on === "substrate"){
          // this.showSubstrateNote = true;
          // this.showFloralSpecies = true;
          // this.setState({ showSubstrateNote: false });
          // console.log(includedFloralSpecies);
          // console.log(setOn);
        // }
    }

    if(this.includedFloralSpecies.length === 0){
        this.showFloralSpecies = false;
    }
  }

  // setFloralSpecies = value => {
  //   let allHabitats = this.props.habitatCategories.habitatCategories.data;
  //   let selectedHabitat = null;
  //   let allFloralSpecies = this.props.floralspecies.floralSpecies.data;
  //   let includedFloralSpecies = [];
  //   for(let habitat in allHabitats){
  //       if(allHabitats[habitat].id === value){
  //           selectedHabitat = allHabitats[habitat];
  //       }
  //   }

  //   for(let floralSpecimen in selectedHabitat.attributes.floral_species_ids){
  //       for(let id in allFloralSpecies){
  //           if(selectedHabitat.attributes.floral_species_ids[floralSpecimen] === allFloralSpecies[id].id){
  //               includedFloralSpecies.push(allFloralSpecies[id]);
  //           }
  //       }
  //   }
  //   this.includedFloralSpecies = includedFloralSpecies;

  //   for(let includedSpecimen in this.includedFloralSpecies){
  //       this.includedFloralSpecies[includedSpecimen]["selected"] = false
  //   }
  //   if(this.includedFloralSpecies.length > 0){
  //       let habitatSpeciesIds = { ...this.state.habitatSpeciesIds };
  //       habitatSpeciesIds.options = includedFloralSpecies;
  //       this.setState({ habitatSpeciesIds: habitatSpeciesIds });
  //       this.showFloralSpecies = true;
  //       this.showHabitatNote = false;
  //   }

  //   if(this.includedFloralSpecies.length === 0){
  //       this.showFloralSpecies = false;
  //   }
  // }

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

  renderFloralSpecies = () => {
    let list;
    if(this.state.habitatSpeciesIds.options){
      list = this.state.habitatSpeciesIds.options;
    }
    return(
      <div>
        <MultiSelectDropdown
          title="Izaberi biljnu vrstu"
          list={list}
          toggleItem={this.toggleSelected}
        />
      </div>
    )
  }

  toggleSelected = (selectedValues) => {
      let selected = [];
      for(let value in selectedValues){
        selected.push(selectedValues[value].id);
      }
      this.props.change("habitat_species_ids", selected)
  }

  render(){
    console.log(this.showSubstrateNote)
    const { handleSubmit, previousPage } = this.props;
      return (
        <form onSubmit={handleSubmit} className="ObservationNew form-small">
          <div className="Form-title">
            <h4>Dodaj Nalaz</h4>
            <hr />
          </div>
          <div className="form-row">

          </div>
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
          {this.showFloralSpecies? <div className="Input">
            <label>Biljna vrsta</label>
            <div>
              <Field 
                name="habitat_species_ids" 
                component={this.renderFloralSpecies} />
            </div>
            {/* <Field 
              name="description" 
              component={renderError} /> */}
          </div>: null}
          <div className="Input">
            <label>Substrat</label>
            <Field 
              onChange={(event) => this.onSelectedSubstrate(event)}
              name="substrate_categories"
              component={this.renderSubstrateSelector} />
          </div>
          {this.state.showSubstrateNote? <div className="Input">
            <label>Napomena *</label>
            <div>
              <Field 
                name="substrate_note" 
                component="textarea" />
            </div>
              <Field 
                name="habitat_note" 
                component={renderError} />
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
          {this.showFloralSpecies? <div className="Input">
            <label>Biljna vrsta</label>
            <div>
              <Field 
                name="habitat_species_ids" 
                component={this.renderFloralSpecies} />
            </div>
            {/* <Field 
              name="description" 
              component={renderError} /> */}
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
          // fetchSpecies: () => dispatch(actions.fetchSpecies()),
          fetchHabitats: () => dispatch(actions.fetchHabitats()),
          floralSpecies: () => dispatch(actions.floralSpecies()),
          fetchSubstrate: () => dispatch(actions.fetchSubstrate())
      };
  };
  

const wrappedForm = reduxForm({
  form: 'observationForm', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(ObservationFormSecondPage);

export default connect(mapStateToProps, mapDispatchToProps)(wrappedForm)