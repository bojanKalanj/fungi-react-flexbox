import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import validate from './validate';
import moment from 'moment';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

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
            <div >
              <Field
                name="area"
                type="text"
                component={FormField}
                label="Područje na kojem je nalaz pronadjen *"
                placeholder="Petrovaradin"
              />
            </div>
            <div >
              <Field
                name="location"
                type="text"
                component={FormField}
                label="Lokacija na kojoj je nalaz pronadjen *"
                placeholder="Tvrdjava"
              />
            </div>
          <div className="form-row">
            <div >
              <div className="Input">
                <label >Kada je nalaz uočen</label>
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
            <div className="half-width">
              <label style={{ display: 'block', margin: '15px 0 5px 0', color: '#fff', fontWeight: 'bold' }}>Označi lokaciju na mapi (opciono)</label>
              <div className="map-wrapper">
                  <Map
                      google={this.props.google}
                      zoom={10}
                      style={{ width: '100%',
                              height: '100%',
                              position: 'relative'
                      }}
                      className={'map'}
                      initialCenter={{
                          lat: 45.2678024,
                          lng: 19.7552953
                      }}
                      scrollwheel={false}
                      keyboardShortcuts={false}
                      mapTypeControl={false}
                      streetViewControl={false}
                      fullscreenControl={false}
                  >
              
                      <Marker
                          onClick={this.onMarkerClick}
                          name={'Trenutna lokacija'}
                      />
                
                  </Map>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="half-width">
            </div>
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

const wrappedMap = GoogleApiWrapper({
  apiKey: "AIzaSyA-6n8DEeL1ff9oPSbXS2GbyWsrri53Mo0"
})(wrappedForm);

export default connect(null)(wrappedMap);