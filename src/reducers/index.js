import { combineReducers } from 'redux';
import observationsReducer from './observationsReducer';
import observationReducer from './observationReducer';
import speciesReducer from './speciesReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';
import newObservationReducer from './newObservationReducser';

export default combineReducers({
    observations: observationsReducer,
    observation: observationReducer,
    species: speciesReducer,
    user: userReducer,
    auth: authReducer,
    newObservation: newObservationReducer
});