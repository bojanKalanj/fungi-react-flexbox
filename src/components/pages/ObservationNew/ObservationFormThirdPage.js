import React from 'react';
import { Field, reduxForm } from 'redux-form';

const ObservationFormThirdPage = props => {
  const { handleSubmit, pristine, previousPage, submitting } = props
  return (
    <form onSubmit={handleSubmit} className="ObservationNew">
      <div className="Form-title">
        <h4>Dodaj Nalaz</h4>
        <hr />
      </div>
      <div>
        <label htmlFor="images">Slike</label>
        <div>
          <Field
            name="images"
            id="images"
            component="input"
            type="file"
          />
        </div>
      </div>
      <div>
        <button type="button" className="previous" onClick={previousPage}>
          Vrati se
        </button>
        <button type="submit" disabled={pristine || submitting}>
          Kreiraj nalaz
        </button>
      </div>
    </form>
  )
};

export default reduxForm({
  form: 'observationForm', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(ObservationFormThirdPage);