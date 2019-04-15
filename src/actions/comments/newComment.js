import fungi from '../../apis/fungi';

export const newComment = (formValues, token) => async dispatch => {
    fungi.post("/comments", formValues, { 
        headers: { "AUTHORIZATION" : `Bearer ${token}`, 
                   "Accept" : 'application/json',
                   "Content-Type": 'application/json'}
        }
    )
};