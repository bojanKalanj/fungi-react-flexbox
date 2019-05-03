import fungi from '../../apis/fungi';

const fetchObservationsStart = () => {
    return{
        type: "FETCH_OBSERVATIONS_START"
    }
}

const fetchObservationsSuccess = (array) => {
    return {
        type: "FETCH_OBSERVATIONS_SUCCESS",
        payload: array
    };
};

const fetchObservationsFails = (error) => {
    return{
        type: "FETCH_OBSERVATIONS_FAIL",
        error: error
    };
};

export const fetchObservations = (currentPage) => {
    return dispatch =>{
        dispatch(fetchObservationsStart());

        fungi.get(`/observations?page=${currentPage}`)
        .then(response => {
            dispatch(fetchObservationsSuccess(response.data.data));
        })
        .catch(error => {
            dispatch(fetchObservationsFails(error));
        })
    };
};
