const initialState = {
    user: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case "FETCH_USER_START":
            return {
                ...state,
                error: null, 
                loading: true
            }
        case "FETCH_USER_SUCCESS":
            return {
                ...state,
                user: action.user,
                error: null, 
                loading: false
            }
        case "FETCH_USER_FAIL":
            return {
                ...state,
                error: action.error, 
                loading: false
            }         
        default: return state
    }
}

export default reducer;