import { combineReducers } from 'redux';
import observationsReducer from './observationsReducer';

export default combineReducers({
    observations: observationsReducer
});