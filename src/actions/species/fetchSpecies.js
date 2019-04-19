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
            dispatch(fetchSpeciesSuccess(response.data.data));
        })
        .catch(error => {
            dispatch(fetchSpeciessFails(error));
        })
    };
};
