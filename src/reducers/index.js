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
import { reducer as formReducer } from 'redux-form';

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
    form: formReducer
});