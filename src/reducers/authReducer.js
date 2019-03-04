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
            console.log(action.token);
            return {
                ...state,
                token: action.token.jwt,
                userID: action.token.user_id,
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