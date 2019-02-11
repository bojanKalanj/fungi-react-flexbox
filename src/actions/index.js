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

//////////////////////////////////////////
export const setSpecies = species => {
    return{
        type: 'FETCH_SPECIES',
        payload: species
    }
}

export const fetchSpecies = () => {
    return dispatch => (
       fungi.get('/species')
        .then(response => {
            dispatch(setSpecies(response.data))
        })
        .catch(error => console.log(error))
    )
};
    
