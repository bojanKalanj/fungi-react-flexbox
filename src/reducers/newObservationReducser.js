const initialState = {
    token: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case "NEW_OBSERVATION_START":
            return {
                ...state,
                error: null, 
                loading: true
            }
        case "AUTH_SUCCESS":
            return {
                ...state,
                token: action.token,
                error: null, 
                loading: false
            }
        case "AUTH_FAIL":
            return {
                ...state,
                error: action.error, 
                loading: false
            }         
        default: return state
    }
}

export default reducer;