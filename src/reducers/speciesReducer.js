export default (state = [], action) => {
    switch(action.type){
        case 'FETCH_SPECIES':
            return action.payload;
        default:
            return state;
    }
};