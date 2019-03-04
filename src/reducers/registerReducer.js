const initialState = {
    user: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case "REGISTER_START":
            return {
                ...state,
                error: null, 
                loading: true
            }
        case "REGISTER_SUCCESS":
            return {
                ...state,
                user: action.user,
                error: null, 
                loading: false
            }
        case "REGISTER_FAIL":
            return {
                ...state,
                error: action.error, 
                loading: false
            }
        default: return state
    }
}

export default reducer;