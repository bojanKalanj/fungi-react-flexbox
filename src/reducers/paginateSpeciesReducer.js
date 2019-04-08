const initialState = {
    species: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case "PAGINATE_SPECIES_START":
            return {
                ...state,
                error: null, 
                loading: true
            }
        case "PAGINATE_SPECIES_SUCCESS":
            return {
                ...state,
                species: action.species,
                error: null, 
                loading: false
            }
        case "PAGINATE_SPECIES_FAIL":
            return {
                ...state,
                error: action.error, 
                loading: false
            }         
        default: return state
    }
}

export default reducer;