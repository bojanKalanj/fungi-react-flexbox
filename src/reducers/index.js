import { combineReducers } from 'redux';
import observationsReducer from './observationsReducer';
import speciesReducer from './speciesReducer';

export default combineReducers({
    observations: observationsReducer,
    species: speciesReducer
});