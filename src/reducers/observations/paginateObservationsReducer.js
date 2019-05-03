const initialState = {
    observations: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case "PAGINATE_OBSERVATIONS_START":
            return {
                ...state,
                error: null, 
                loading: true
            }
        case "PAGINATE_OBSERVATIONS_SUCCESS":
            return {
                ...state,
                observations: action.observations,
                error: null, 
                loading: false
            }
        case "PAGINATE_OBSERVATIONS_FAIL":
            return {
                ...state,
                error: action.error, 
                loading: false
            }         
        default: return state
    }
}

export default reducer;