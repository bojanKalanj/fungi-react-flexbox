import fungi from '../../apis/fungi';

export const fetchSubstrateStart = () => {
    return{
        type: "FETCH_SUBSTRATE_START"
    }
}

export const fetchSubstrateSuccess = (substrate) => {
    return{
        type: "FETCH_SUBSTRATE_SUCCESS",
        substrate: substrate
    };
};

export const fetchSubstrateFails = (error) => {
    return{
        type: "FETCH_SUBSTRATE_FAIL",
        error: error
    };
};

export const fetchSubstrate = () => {
    return dispatch =>{
        dispatch(fetchSubstrateStart());
        
        fungi.get("/substrate_categories")
        .then(response => {
            dispatch(fetchSubstrateSuccess(response.data));
        })
        .catch(error => {
            dispatch(fetchSubstrateFails(error));
        })
    };
};

