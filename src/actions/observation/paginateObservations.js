import fungi from '../../apis/fungi';

export const paginateObservationsStart = () => {
    return{
        type: "PAGINATE_OBSERVATIONS_START"
    }
}

export const paginateObservationsSuccess = (observations) => {
    return{
        type: "PAGINATE_OBSERVATIONS_SUCCESS",
        observations: observations
    };
};

export const paginateObservationsFails = (error) => {
    return{
        type: "PAGINATE_OBSERVATIONS_FAIL",
        error: error
    };
};

export const paginateObservations = currentPage => {
    return dispatch =>{
        dispatch(paginateObservationsStart());
        
        fungi.get(`/observations?page=${currentPage}`)
        .then(response => {
            console.log(response.data)
            dispatch(paginateObservationsSuccess(response.data));
        })
        .catch(error => {
            dispatch(paginateObservationsFails(error));
        })
    };
};

