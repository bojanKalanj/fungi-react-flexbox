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
    onMarkerClick = (props, marker, e) =>
      this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
      });

    render() {
      const { handleSubmit } = this.props;
      return (
        <form onSubmit={handleSubmit} className="ObservationNew form-wide">
          <div className="Form-title">
              <h4>Dodaj Nalaz</h4>
              <hr />
          </div>
          <div className="form-row">
            <div className="half-width" style={{ height: '446.6px' }}>
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
                  normalize={value => (value ? moment(value).format("dd-MMM-YYYY") : null)}
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
                    {/* <Map
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
                  
                    </Map> */}

                    <CurrentLocation
                      centerAroundCurrentLocation
                      google={this.props.google}
                      zoom={14}
                      style={{ width: '100%',
                              height: '400px',
                              position: 'relative'
                      }}
                      keyboardShortcuts={false}
                      mapTypeControl={false}
                      streetViewControl={false}
                      fullscreenControl={false}
                    >
                      <Marker onClick={this.onMarkerClick} name={'current location'} />
                      {/* <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                      >
                        <div>
                          <h4>{this.state.selectedPlace.name}</h4>
                        </div>
                      </InfoWindow> */}
                    </CurrentLocation>
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
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };
};

const wrappedForm = reduxForm({
  form: 'observationForm', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(ObservationFormFirstPage);

export default connect(mapStateToProps)(wrappedForm);