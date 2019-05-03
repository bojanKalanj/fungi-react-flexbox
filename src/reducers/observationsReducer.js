const initialState = {
    observationsArray: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case "FETCH_OBSERVATIONS_START":
            return {
                ...state,
                error: null,
                loading: true
            }
        case "FETCH_OBSERVATIONS_SUCCESS":
            return {
                ...state,
                observationsArray: action.payload,
                error: null,
                loading: false
            }
        case "FETCH_OBSERVATIONS_FAIL":
            return {
                ...state,
                error: action.error,
                loading: false
            }
        default:
            return state
    }
}

export default reducer;
