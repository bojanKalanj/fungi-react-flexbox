import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import { connect } from 'react-redux';
// import fetchHabitats from '../../../actions';
import * as actions from '../../../actions';

// import FormField from '../../../UI/Form/FormField';

// let habitats = ['Antropogena šuma', 'Livada', 'Park', 'Vinograd'];

// const renderHabitatSelector = ({ input, meta: { touched, error } }) => (
//   <div>
//     <select {...input}>
//       <option value="">Izaberite opciju</option>
//       {habitats.map(val => (
//         <option value={val} key={val}>
//           {val}
//         </option>
//       ))}
//     </select>
//     {touched && error && <span>{error}</span>}
//   </div>
// );

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <div className="input-error"><span>{error}</span></div> : false

// const ObservationFormSecondPage = props => {
//   const { handleSubmit, previousPage } = props
//   return (
//     <form onSubmit={handleSubmit} className="ObservationNew">
//       <div className="Form-title">
//         <h4>Dodaj Nalaz</h4>
//         <hr />
//       </div>
//       {/* <div>
//         <label>Stanište</label>
//         <Field name="habitat_category_id" component={renderHabitatSelector} />
//       </div> */}
//       <div>
//         <label>Opis nalaza *</label>
//         <div>
//           <Field name="description" component="textarea" />
//         </div>
//         <Field name="description" component={renderError} />
//       </div>
//       <div>
//         <button type="button" className="previous" onClick={previousPage}>
//           Vrati se
//         </button>
//         <button type="submit" className="next">
//           Nastavi
//         </button>
//       </div>
//     </form>
//   )
// };

class ObservationFormSecondPage extends Component{
  componentDidMount = () => {
    this.props.fetchHabitats();
    this.props.floralSpecies();
  }

  habitats = [];
  componentWillReceiveProps = newProps => {
    if(newProps.state.habitatCategories.habitatCategories){
      const habitatCategories = newProps.state.habitatCategories.habitatCategories.data;
      for(let habitatCategorie in habitatCategories ){
        this.habitats.push(habitatCategories[habitatCategorie]); 
      }
    }
  }

  showHabitatNote = false;
  onSelected = (event) => {
    const value = event.target.value;
    if(value === "32"){
      this.showHabitatNote = true;
    }else if(value !== "32"){
      this.showHabitatNote = false;
      this.setFloralSpecies(value);
    }
  }

  setFloralSpecies = value => {
    let allHabitats = this.props.habitatCategories.habitatCategories.data;
    let selectedHabitat = null;
    let allFloralSpecies = this.props.floralspecies.floralSpecies.data;
    let includedFloralSpecies = [];
      for(let habitat in allHabitats){
          if(allHabitats[habitat].id === value){
              selectedHabitat = allHabitats[habitat];
          }
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

  render(){
    const { handleSubmit, previousPage } = this.props;
      return (
        <form onSubmit={handleSubmit} className="ObservationNew">
          <div className="Form-title">
            <h4>Dodaj Nalaz</h4>
            <hr />
          </div>
          <div>
            <label>Stanište</label>
            <Field  onChange={(event) => this.onSelected(event)}
                    name="habitat_category_id"
                    component={this.renderHabitatSelector} />
          </div>
          {this.showHabitatNote? <div>
            <label>Napomena *</label>
            <div>
              <Field name="habitat_note" component="textarea" />
            </div>
              <Field name="habitat_note" component={renderError} />
          </div>: null}
          <div>
            <label>Opis nalaza *</label>
            <div>
              <Field name="description" component="textarea" />
            </div>
            <Field name="description" component={renderError} />
          </div>
          <div>
            <button type="button" className="previous" onClick={previousPage}>
              Vrati se
            </button>
            <button type="submit" className="next">
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
  }
}

const mapDispatchToProps = dispatch => {
      return{
          onObservationSubmit: (observation, token) => dispatch(actions.newObservation(observation, token)),
          // fetchSpecies: () => dispatch(actions.fetchSpecies()),
          fetchHabitats: () => dispatch(actions.fetchHabitats()),
          floralSpecies: () => dispatch(actions.floralSpecies())
      };
  };
  

const wrappedForm = reduxForm({
  form: 'observationForm', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(ObservationFormSecondPage);

export default connect(mapStateToProps, mapDispatchToProps)(wrappedForm)