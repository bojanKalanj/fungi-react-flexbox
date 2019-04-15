const initialState = {
    error: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case "DELETE_COMMENT_SUCESS":
            return {
                ...state,
                error: null, 
            }
        case "DELETE_COMMENT_FAIL":
            return {
                ...state,
                error: action.error, 
            }         
        default: return state
    }
}

export default reducer;