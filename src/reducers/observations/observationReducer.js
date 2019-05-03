// export default (state = [], action) => {
//     switch(action.type){
//         case 'FETCH_OBSERVATION':
//             return action.payload;
//         default:
//             return state;
//     }
// };

const initialState = {
    observation: null,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case "FETCH_OBSERVATION_START":
            return {
                ...state,
                error: null, 
                loading: true
            }
        case "FETCH_OBSERVATION_SUCCESS":
            return {
                ...state,
                observation: action.observation,
                error: null, 
                loading: false
            }
        case "AUTH_FAIL":
            return {
                ...state,
                error: action.error, 
                loading: false
            }         
        default: return state
    }
}

export default reducer;