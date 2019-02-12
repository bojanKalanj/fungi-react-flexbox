import { combineReducers } from 'redux';
import observationsReducer from './observationsReducer';
import observationReducer from './observationReducer';
import speciesReducer from './speciesReducer';

export default combineReducers({
    observations: observationsReducer,
    observation: observationReducer,
    species: speciesReducer
});