import React from 'react';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import FormField from '../../../UI/Form/FormField';
import Button from '../../../UI/Button/Button';

const ObservationFormFirstPage = props => {
    const { handleSubmit } = props
    return (
      <form onSubmit={handleSubmit} className="ObservationNew">
        <div className="Form-title">
            <h4>Dodaj Nalaz</h4>
            <hr />
        </div>
        <div className="form-row">
          <div className="half-width">
            <Field
              name="area"
              type="text"
              component={FormField}
              label="Područje na kojem je nalaz pronadjen *"
              placeholder="Petrovaradin"
            />
          </div>
          <div className="half-width">
            <Field
              name="location"
              type="text"
              component={FormField}
              label="Lokacija na kojoj je nalaz pronadjen *"
              placeholder="Tvrdjava"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="half-width">
            <div className="Input">
              <label style={{ margin: '10px 0', color: '#fff', fontWeight: 'bold' }}>Kada je nalaz uočen</label>
              <Field
                name="observed_at"
                type="date"
                component="input"
              />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="half-width">
            <Button wide={true}>
              Nastavi
            </Button>
          </div>
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