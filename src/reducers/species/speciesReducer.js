const initialState = {
    data: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case "FETCH_SPECIES_START":
            return {
                ...state,
                error: null, 
                loading: true
            }
        case "FETCH_SPECIES_SUCCESS":
            return {
                ...state,
                data: action.species,
                error: null, 
                loading: false
            }
        case "FETCH_SPECIES_FAIL":
            return {
                ...state,
                error: action.error, 
                loading: false
            }         
        default: return state
    }
}

export default reducer;