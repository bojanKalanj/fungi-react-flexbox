import fungi from '../../apis/fungi';

export const fetchObservationStart = () => {
    return{
        type: "FETCH_OBSERVATION_START"
    }
}

export const fetchObservationSuccess = (observation) => {
    return{
        type: "FETCH_OBSERVATION_SUCCESS",
        observation: observation
    };
};

export const fetchObservationFail = (error) => {
    return{
        type: "FETCH_OBSERVATION_FAIL",
        error: error
    };
};

export const fetchObservation = (observationId) => {
    return dispatch =>{
        dispatch(fetchObservationStart());
        
        fungi.get(`/observations/${observationId}`)
        .then(response => {
            console.log(response.data);
            dispatch(fetchObservationSuccess(response.data));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchObservationFail(error));
        })
    };
};

