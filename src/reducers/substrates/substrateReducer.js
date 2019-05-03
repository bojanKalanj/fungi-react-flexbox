const initialState = {
    substrate: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case "FETCH_SUBSTRATE_START":
            return {
                ...state,
                error: null, 
                loading: true
            }
        case "FETCH_SUBSTRATE_SUCCESS":
            return {
                ...state,
                substrate: action.substrate,
                error: null, 
                loading: false
            }
        case "FETCH_SUBSTRATE_FAIL":
            return {
                ...state,
                error: action.error, 
                loading: false
            }         
        default: return state
    }
}

export default reducer;