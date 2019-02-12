import fungi from '../apis/fungi';

export const setObervations = observations => {
    return{
        type: 'FETCH_OBSERVATIONS',
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
export const setObervation = observations => {
    return{
        type: 'FETCH_OBSERVATION',
        payload: observations
    }
}

export const fetchObservation = (observationId) => {
    return dispatch => (
       fungi.get(`/observations/${observationId}`)
        .then(response => {
            dispatch(setObervation(response.data))
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
    
