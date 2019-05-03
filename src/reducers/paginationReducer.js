const initialState = {
    currentPage: 1
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case "PAGINATION_SELECTED":
            return {
                currentPage: action.payload 
            }
        default:
            return state
    }
}

export default reducer;
