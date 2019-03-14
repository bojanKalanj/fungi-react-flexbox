import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
// import FormField from '../../../UI/Form/FormField';

const habitats = ['Antropogena šuma', 'Livada', 'Park', 'Vinograd'];

const renderHabitatSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">Izaberite opciju</option>
      {habitats.map(val => (
        <option value={val} key={val}>
          {val}
        </option>
      ))}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
);

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <div className="input-error"><span>{error}</span></div> : false

const ObservationFormSecondPage = props => {
  const { handleSubmit, previousPage } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Stanište</label>
        <Field name="habitat_category_id" component={renderHabitatSelector} />
      </div>
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
};

export default reduxForm({
  form: 'observationForm', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(ObservationFormSecondPage);