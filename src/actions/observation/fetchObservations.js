import fungi from '../../apis/fungi';

export const fetchObservationsStart = () => {
    return{
        type: "FETCH_OBSERVATIONS_START"
    }
}

export const fetchObservationSuccess = (observations) => {
    return{
        type: "FETCH_OBSERVATIONS_SUCCESS",
        observations: observations
    };
};

export const fetchObservationsFails = (error) => {
    return{
        type: "FETCH_OBSERVATIONS_FAIL",
        error: error
    };
};

export const fetchObservations = (observationId) => {
    return dispatch =>{
        dispatch(fetchObservationsStart());
        
        fungi.get("/observations")
        .then(response => {
            console.log(response.data);
            dispatch(fetchObservationSuccess(response.data));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchObservationsFails(error));
        })
    };
};

