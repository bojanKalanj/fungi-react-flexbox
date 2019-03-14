import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import FormField from '../../../UI/Form/FormField';

const ObservationFormFirstPage = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="area"
        type="text"
        component={FormField}
        label="Područje na kojem je nalaz pronadjen *"
        placeholder="Petrovaradin"
      />
      <Field
        name="location"
        type="text"
        component={FormField}
        label="Lokacija na kojoj je nalaz pronadjen *"
        placeholder="Tvrdjava"
      />
      <Field
        name="observed_at"
        type="date"
        component={FormField}
        label="Kada je nalaz uočen"
      />
      <div>
        <button type="submit" className="next">
          Nastavi
        </button>
      </div>
    </form>
  )
};

export default reduxForm({
  form: 'observationForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(ObservationFormFirstPage);