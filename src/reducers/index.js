import { combineReducers } from 'redux';
import observationsReducer from './observationsReducer';
import observationReducer from './observationReducer';
import speciesReducer from './speciesReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';
import newObservationReducer from './newObservationReducser';
import habitatsReducer from './habitatsReducer';
import registerUser from './registerReducer';
import floralSpeciesReducer from './floralSpeciesReducer';
import substrateReducer from './substrateReducer';
import { reducer as formReducer } from 'redux-form';
import dropdownDataReducer from './dropdownDataReducer';
import paginateObservationsReducer from './paginateObservationsReducer';

export default combineReducers({
    observations: observationsReducer,
    observation: observationReducer,
    species: speciesReducer,
    user: userReducer,
    auth: authReducer,
    newObservation: newObservationReducer,
    habitatCategories: habitatsReducer,
    registeredUser: registerUser,
    floralspecies: floralSpeciesReducer,
    form: formReducer,
    substrate: substrateReducer,
    dropdownData: dropdownDataReducer,
    paginateObservations: paginateObservationsReducer
});