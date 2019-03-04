const initialState = {
    token: null,
    userID: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case "AUTH_START":
            return {
                ...state,
                error: null, 
                loading: true
            }
        case "AUTH_SUCCESS":
            return {
                ...state,
                token: action.authData.jwt,
                userID: action.authData.user_id,
                error: null, 
                loading: false
            }
        case "AUTH_FAIL":
            return {
                ...state,
                error: action.error, 
                loading: false
            }
        case "LOGOUT":
            return {
                ...state,
                token: null,
                userID: null,
            }               
        default: return state
    }
}

export default reducer;