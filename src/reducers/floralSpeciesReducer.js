const initialState = {
    floralSpecies: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case "FLORAL_SPECIES_START":
            return {
                ...state,
                error: null, 
                loading: true
            }
        case "FLORAL_SPECIES_SUCCESS":
            return {
                ...state,
                floralSpecies: action.floralSpecies,
                error: null, 
                loading: false
            }
        case "FLORAL_SPECIES_FAIL":
            return {
                ...state,
                error: action.error, 
                loading: false
            }         
        default: return state
    }
}

export default reducer;