export default (state = [], action) => {
    switch(action.type){
        case 'FETCH_OBSERVATIONS':
            return action.payload;
        default:
            return state;
    }
};