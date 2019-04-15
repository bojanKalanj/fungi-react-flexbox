import fungi from '../../apis/fungi';
import {fetchComments} from './fetchComments';

// export const newCommentPostStart = () => {
//     return { type: "FETCH_OBSERVATION_START" }
// }

export const newCommentPostSucces = newComment => {
    return {
            type: "NEW_COMMENT_POST_SUCESS",
            newComment: newComment
        }
}

export const newCommentPostFail = () => {
    return { type: "NEW_COMMENT_POST_FAIL" }
}

export const newComment = (formValues, token, observationID) => async dispatch => {
    fungi.post(`/observations/${observationID}/comments`, formValues, { 
        headers: { "AUTHORIZATION" : `Bearer ${token}`, 
                   "Accept" : 'application/json',
                   "Content-Type": 'application/json'}
        }
    ).then(response => {
        console.log(response);
        dispatch(newCommentPostSucces(response));
        dispatch(fetchComments(observationID));
    }).catch(error => {
        console.log(error);
        dispatch(newCommentPostFail(error));
    })
};