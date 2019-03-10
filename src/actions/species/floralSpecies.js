import fungi from '../../apis/fungi';

export const floralSpeciesStart = () => {
    return{
        type: "FLORAL_SPECIES_START"
    }
}

export const floralSpeciesSuccess = (floralSpecies) => {
    return{
        type: "FLORAL_SPECIES_SUCCESS",
        floralSpecies: floralSpecies
    };
};

export const floralSpeciessFails = (error) => {
    return{
        type: "FLORAL_SPECIES_FAIL",
        error: error
    };
};

export const floralSpecies = () => {
    return dispatch =>{
        dispatch(floralSpeciesStart());
        
        fungi.get("/floral_species")
        .then(response => {
            dispatch(floralSpeciesSuccess(response.data));
        })
        .catch(error => {
            dispatch(floralSpeciessFails(error));
        })
    };
};

