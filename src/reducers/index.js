import { combineReducers } from 'redux';
import observations from './observations/observationsReducer';
import observation from './observations/observationReducer';
import observationCount from './observations/observationsCountReducer';
import species from './species/speciesReducer';
import user from './authentication/userReducer';
import auth from './authentication/authReducer';
import habitats from './habitats/habitatsReducer';
import registerUser from './authentication/registerReducer';
import floralSpecies from './species/floralSpeciesReducer';
import substrate from './substrates/substrateReducer';
import { reducer as formReducer } from 'redux-form';
import dropdownData from './dropdown/dropdownDataReducer';
import paginateObservations from './observations/paginateObservationsReducer';
import paginateSpecies from './species/paginateSpeciesReducer';
import newComment from './comments/newCommentReducer';
import comments from './comments/commentsReducer';
import deleteComment from './comments/deleteCommentReducer';
import editComment from './comments/editCommentReducer';

export default combineReducers({
    observations: observations,
    observation: observation,
    species: species,
    user: user,
    auth: auth,
    habitatCategories: habitats,
    registeredUser: registerUser,
    floralspecies: floralSpecies,
    form: formReducer,
    substrate: substrate,
    dropdownData: dropdownData,
    paginateObservations: paginateObservations,
    paginateSpecies: paginateSpecies,
    newComment: newComment,
    fetchedComments: comments,
    deletedComment: deleteComment,
    editedComment: editComment,
    observationCount: observationCount
});
