import fungi from '../../apis/fungi';
import {fetchComments} from './fetchComments';

export const deleteCommentSucces = () => {
    return {
            type: "DELETE_COMMENT_SUCESS",
        }
}

export const deleteCommentFail = () => {
    return { type: "DELETE_COMMENT_FAIL" }
}

export const deleteComment = (token, observationID, commentID) => async dispatch => {
    fungi.delete(`/observations/${observationID}/comments/${commentID}`, { 
        headers: { "AUTHORIZATION" : `Bearer ${token}`, 
                   "Accept" : 'application/json',
                   "Content-Type": 'application/json'}
        }
    ).then(response => {
        console.log(response);
        dispatch(deleteCommentSucces())
        dispatch(fetchComments(observationID));
    }).catch(error => {
        console.log(error);
        dispatch(deleteCommentFail(error));
    })
};