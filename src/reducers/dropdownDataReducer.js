const initialState = {
    dataForHabitat: null,
    dataForSubstrate: null,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "DROPRDOWN_DATA_FOR_HABITATS":
            return{
                ...state,
                dataForHabitat: action.data
            }
        case "DROPRDOWN_DATA_FOR_SUBSTRATES":
            return{
                ...state,
                dataForSubstrate: action.data
            }
        default: return state
    }
}

export default reducer;