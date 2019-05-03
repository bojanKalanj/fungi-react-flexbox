const initialState = {
    newComment: null,
    error: null,
    // loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        // case "NEW_OBSERVATION_START":
        //     return {
        //         ...state,
        //         error: null, 
        //         loading: true
        //     }
        case "NEW_COMMENT_POST_SUCESS":
            return {
                ...state,
                newComment: action.newComment,
                error: null, 
                // loading: false
            }
        case "NEW_COMMENT_POST_FAIL":
            return {
                ...state,
                error: action.error, 
                // loading: false
            }         
        default: return state
    }
}

export default reducer;