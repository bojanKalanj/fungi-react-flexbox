import fungi from '../../apis/fungi';

const fetchObservationsCountStart = () => {
    return{
        type: "FETCH_OBSERVATIONS_COUNT_START"
    }
}

const fetchObservationsCountSuccess = (observationsCount) => {
    return{
        type: "FETCH_OBSERVATIONS_COUNT_SUCCESS",
        payload: observationsCount
    };
};

const fetchObservationsCountFails = (error) => {
    return{
        type: "FETCH_OBSERVATIONS_COUNT_FAIL",
        error: error
    };
};

export const fetchObservationsCount = () => {
    return dispatch =>{
        dispatch(fetchObservationsCountStart());

        fungi.get("/observations")
        .then(response => {
            dispatch(fetchObservationsCountSuccess(response.data.data.length));
        })
        .catch(error => {
            dispatch(fetchObservationsCountFails(error));
        })
    };
};
