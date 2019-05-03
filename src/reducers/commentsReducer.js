const initialState = {
    comments: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case "FETCH_COMMENTS_START":
            return {
                ...state,
                error: null, 
                loading: true
            }
        case "FETCH_COMMENTS_SUCCESS":
            return {
                ...state,
                comments: action.comments,
                error: null, 
                loading: false
            }
        case "FETCH_COMMENTS_FAIL":
            return {
                ...state,
                error: action.error, 
                loading: false
            }         
        default: return state
    }
}

export default reducer;