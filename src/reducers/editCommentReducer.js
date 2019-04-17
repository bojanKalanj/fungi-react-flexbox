const initialState = {
    error: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case "EDIT_COMMENT_SUCESS":
            return {
                ...state,
                error: null, 
            }
        case "EDIT_COMMENT_FAIL":
            return {
                ...state,
                error: action.error, 
            }         
        default: return state
    }
}

export default reducer;