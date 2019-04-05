import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import ObservationForm from './ObservationForm';
import './ObservationNew.css';

class ObservationNew extends Component {

    onFormSubmit = (formValues) => { 
        console.log(formValues);
        this.props.newObservation(formValues, this.props.currentUserToken);
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <ObservationForm onSubmit={this.onFormSubmit} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUserToken: state.auth.token
    };
};
  
export default connect(
    mapStateToProps,
    { newObservation: actions.newObservation }
)(ObservationNew);
