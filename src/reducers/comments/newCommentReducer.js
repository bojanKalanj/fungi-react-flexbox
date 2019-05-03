const initialState = {
    newComment: null,
    error: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case "NEW_COMMENT_POST_SUCESS":
            return {
                ...state,
                newComment: action.newComment,
                error: null, 
            }
        case "NEW_COMMENT_POST_FAIL":
            return {
                ...state,
                error: action.error, 
            }         
        default: return state
    }
}

export default reducer;