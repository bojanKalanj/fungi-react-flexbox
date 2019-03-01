// import fungi from '../../apis/fungi';

// export const setSpecies = species => {
//     return{
//         type: 'FETCH_SPECIES',
//         payload: species
//     }
// }

// export const fetchSpecies = () => {
//     return dispatch => (
//        fungi.get('/species')
//         .then(response => {
//             dispatch(setSpecies(response.data))
//         })
//         .catch(error => console.log(error))
//     )
// };



import fungi from '../../apis/fungi';

export const fetchSpeciesStart = () => {
    return{
        type: "FETCH_SPECIES_START"
    }
}

export const fetchSpeciesSuccess = (species) => {
    return{
        type: "FETCH_SPECIES_SUCCESS",
        species: species
    };
};

export const fetchSpeciessFails = (error) => {
    return{
        type: "FETCH_SPECIES_FAIL",
        error: error
    };
};

export const fetchSpecies = () => {
    return dispatch =>{
        dispatch(fetchSpeciesStart());
        
        fungi.get("/species")
        .then(response => {
            console.log(response.data);
            dispatch(fetchSpeciesSuccess(response.data));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchSpeciessFails(error));
        })
    };
};

