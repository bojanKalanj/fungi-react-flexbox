import fungi from '../../apis/fungi';
import {fetchComments} from './fetchComments';

export const editCommentSucces = () => {
    return {
            type: "EDIT_COMMENT_SUCESS",
        }
}

export const editCommentFail = () => {
    return { type: "EDIT_COMMENT_FAIL" }
}

export const editComment = (formValues, token, observationID, commentID) => async dispatch => {
    console.log("FROM editComment----", "TOKEN:", token)
    fungi.put(`/observations/${observationID}/comments/${commentID}`, formValues, { 
        headers: { "AUTHORIZATION" : `Bearer ${token}`, 
                   "Accept" : 'application/json',
                   "Content-Type": 'application/json'}
        }
    ).then(response => {
        console.log(response);
        dispatch(editCommentSucces())
        dispatch(fetchComments(observationID));
    }).catch(error => {
        console.log(error);
        dispatch(editCommentFail(error));
    })
};
