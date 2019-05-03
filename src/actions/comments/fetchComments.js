import fungi from '../../apis/fungi';

export const fetchCommentsStart = () => {
    return{
        type: "FETCH_COMMENTS_START"
    }
}

export const fetchCommentsSuccess = comments => {
    return{
        type: "FETCH_COMMENTS_SUCCESS",
        comments: comments
    };
};

export const fetchCommentsFails = error => {
    return{
        type: "FETCH_COMMENTS_FAIL",
        error: error
    };
};

export const fetchComments = observation_id => {
    return dispatch =>{
        dispatch(fetchCommentsStart());
        
        fungi.get(`/observations/${observation_id}/comments`)
        .then(response => {
            dispatch(fetchCommentsSuccess(response.data));
        })
        .catch(error => {
            dispatch(fetchCommentsFails(error));
        })
    };
};

