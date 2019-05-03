import { combineReducers } from 'redux';
import countObservationsReducer from './countObservationsReducer';
import observationReducer from './observationReducer';
import speciesReducer from './speciesReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';
// import newObservationReducer from './newObservationReducser';
import habitatsReducer from './habitatsReducer';
import registerUser from './registerReducer';
import floralSpeciesReducer from './floralSpeciesReducer';
import substrateReducer from './substrateReducer';
import { reducer as formReducer } from 'redux-form';
import dropdownDataReducer from './dropdownDataReducer';

import newCommentReducer from './newCommentReducer';
import commentsReducer from './commentsReducer';
import deleteCommentReducer from './deleteCommentReducer';
import editCommentReducer from './editCommentReducer';

import observationsReducer from './observationsReducer';
import paginateSpeciesReducer from './paginateSpeciesReducer'
import paginationReducer from './paginationReducer';
import filtersReducer from './filtersReducer';

export default combineReducers({
    observations: observationsReducer,
    observationsCount: countObservationsReducer,
    currentPage: paginationReducer,
    filters: filtersReducer,

    observation: observationReducer,
    species: speciesReducer,
    user: userReducer,
    auth: authReducer,
    // newObservation: newObservationReducer,
    habitatCategories: habitatsReducer,
    registeredUser: registerUser,
    floralspecies: floralSpeciesReducer,
    form: formReducer,
    substrate: substrateReducer,
    dropdownData: dropdownDataReducer,

    paginateSpecies: paginateSpeciesReducer,
    newComment: newCommentReducer,
    fetchedComments: commentsReducer,
    deletedComment: deleteCommentReducer,
    editedComment: editCommentReducer
});
