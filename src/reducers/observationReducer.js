export default (state = [], action) => {
    switch(action.type){
        case 'FETCH_OBSERVATION':
            return action.payload;
        default:
            return state;
    }
};