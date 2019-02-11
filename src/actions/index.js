import fungi from '../apis/fungi';

export const setObervations = observations => {
    return{
        type: 'FETCH_OBSERVATION',
        payload: observations
    }
}

export const fetchObservations = () => {
    return dispatch => (
       fungi.get('/observations')
        .then(response => {
            dispatch(setObervations(response.data))
        })
        .catch(error => console.log(error))
    )
};
    
