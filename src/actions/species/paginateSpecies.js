import fungi from '../../apis/fungi';

export const paginateSpeciesStart = () => {
    return{
        type: "PAGINATE_SPECIES_START"
    }
}

export const paginateSpeciesSuccess = (species) => {
    return{
        type: "PAGINATE_SPECIES_SUCCESS",
        species: species
    };
};

export const paginateSpeciesFails = (error) => {
    return{
        type: "PAGINATE_SPECIES_FAIL",
        error: error
    };
};

export const paginateSpecies = currentPage => {
    return dispatch =>{
        dispatch(paginateSpeciesSuccess());
        
        fungi.get(`/species?page=${currentPage}`)
        .then(response => {
            console.log(response.data)
            dispatch(paginateSpeciesSuccess(response.data));
        })
        .catch(error => {
            dispatch(paginateSpeciesFails(error));
        })
    };
};

