import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import validate from './validate';
import moment from 'moment';
import CurrentLocation from './CurrentLocation';
import { InfoWindow, Marker } from 'google-maps-react';

import FormField from '../../../UI/Form/FormField';
import Button from '../../../UI/Button/Button';
import renderDatePicker from './renderDatePicker';


import "react-datepicker/dist/react-datepicker.css";


class ObservationFormFirstPage extends Component {
    markers = [];

    placeMarkerAndPanTo(props, map, latLng) {
      if (this.markers.length > 0) {
        this.markers[0].setMap(null);
        this.markers = [];
      }

      let marker = new props.google.maps.Marker({
        position: latLng,
        map: map
      });
      map.panTo(latLng);
      this.markers.push(marker);
    }

    onMapClicked = (props, map, e) => {
      this.props.change('latitude', e.latLng.lat().toFixed(4));
      this.props.change('longitude', e.latLng.lng().toFixed(4));
      this.placeMarkerAndPanTo(props, map, e.latLng);
    }

    render() {
      const { handleSubmit } = this.props;
      return (
        <form onSubmit={handleSubmit} className="ObservationNew form-wide">
          <div className="Form-title">
              <h4>Dodaj Nalaz</h4>
              <hr />
          </div>
          <div className="form-row">
            <div className="half-width" style={{ height: '589.2px' }}>
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
              <div className="Input">
                <label style={{ color: '#645047',
                                fontFamily: 'Helvetica, Arial',
                                fontSize: '11px',
                                letterSpacing: '0.12em',
                                lineHeight: '2em',
                                textTransform: 'uppercase',
                                fontWeight: '400'
                              }}>Kada je nalaz uočen</label>
                <Field
                  name="observed_at"
                  dateFormat="dd-MMM-YYYY"
                  inputValueFormat="dd-MMM-YYYY"
                  dropdownMode="select"
                  normalize={value => (value ? moment(value).format("DD-MMM-YYYY") : null)}
                  component={renderDatePicker}
                />
              </div>
            </div>
            <div className="half-width">
              <div style={{ marginTop: '20px' }}>
                <label style={{ color: '#645047',
                                fontFamily: 'Helvetica, Arial',
                                fontSize: '11px',
                                letterSpacing: '0.12em',
                                lineHeight: '2em',
                                textTransform: 'uppercase',
                                fontWeight: '400' }}>Označi lokaciju nalaza na mapi</label>
                <div className="map-wrapper">

                    <CurrentLocation
                      centerAroundCurrentLocation
                      google={this.props.google}
                      zoom={12}
                      style={{ width: '100%',
                              height: '400px',
                              position: 'relative'
                      }}
                      keyboardShortcuts={false}
                      mapTypeControl={false}
                      streetViewControl={false}
                      fullscreenControl={false}
                      onClick={this.onMapClicked}
                    >

                    </CurrentLocation>
                </div>
                <div className="form-row">
                  <div className="half-width">
                    <Field
                      name="latitude"
                      type="text"
                      component={FormField}
                      disabled={true}
                    />
                  </div>
                  <div className="half-width">
                    <Field
                      name="longitude"
                      type="text"
                      component={FormField}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
              <Button>
                Nastavi
              </Button>
        </form>
      );
    }
}

const mapStateToProps = (state) => {
    return {
        // initialValues: {
        //   observed_at: moment("03-05-2019").format("dd-MMM-YYYY"),
        // },
        showingInfoWindow: false
    };
};

const wrappedForm = reduxForm({
  form: 'observationForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(ObservationFormFirstPage);

export default connect(mapStateToProps)(wrappedForm);