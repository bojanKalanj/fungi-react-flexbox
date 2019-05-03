const initialState = {
    habitatCategories: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case "FETCH_HABITATS_START":
            return {
                ...state,
                error: null, 
                loading: true
            }
        case "FETCH_HABITATS_SUCCESS":
            return {
                ...state,
                habitatCategories: action.habitatCategories,
                error: null, 
                loading: false
            }
        case "FETCH_HABITATS_FAIL":
            return {
                ...state,
                error: action.error, 
                loading: false
            }         
        default: return state
    }
}

export default reducer;