import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import validate from './validate';
import moment from 'moment';

import FormField from '../../../UI/Form/FormField';
import Button from '../../../UI/Button/Button';
import renderDatePicker from './renderDatePicker';

import "react-datepicker/dist/react-datepicker.css";


class ObservationFormFirstPage extends Component {
    constructor(props) {
      super(props);
      this.state = { date: new Date() };
    }

    render() {
      const { handleSubmit } = this.props;
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
                  dateFormat="dd-MMM-YYYY"
                  inputValueFormat="dd-MMM-YYYY"
                  dropdownMode="select"
                  normalize={value => (value ? moment(value).format("dd-MMM-YYYY") : null)}
                  component={renderDatePicker}
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
      );
    }
}

const wrappedForm = reduxForm({
  form: 'observationForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(ObservationFormFirstPage);

export default connect(null)(wrappedForm);