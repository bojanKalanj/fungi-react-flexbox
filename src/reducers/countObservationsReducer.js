const initialState = {
    count: 0,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case "FETCH_OBSERVATIONS_COUNT_START":
            return {
                ...state,
                error: null,
                loading: true
            }
        case "FETCH_OBSERVATIONS_COUNT_SUCCESS":
            return {
                ...state,
                count: action.payload,
                error: null,
                loading: false
            }
        case "FETCH_OBSERVATIONS_COUNT_FAIL":
            return {
                ...state,
                count: 0,
                error: action.error,
                loading: false
            }
        default:
            return state
    }
}

export default reducer;
