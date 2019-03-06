import fungi from '../../apis/fungi';

export const floralSpeciesStart = () => {
    return{
        type: "FLORAL-SPECIES_START"
    }
}

export const floralSpeciesSuccess = (floralSpecies) => {
    return{
        type: "FLORAL-SPECIES_SUCCESS",
        floralSpecies: floralSpecies
    };
};

export const floralSpeciessFails = (error) => {
    return{
        type: "FLORAL-SPECIES_FAIL",
        error: error
    };
};

export const floralSpecies = () => {
    return dispatch =>{
        dispatch(floralSpeciesStart());
        
        fungi.get("/floral_species")
        .then(response => {
            console.log(response.data);
            dispatch(floralSpeciesSuccess(response.data));
        })
        .catch(error => {
            console.log(error);
            dispatch(floralSpeciessFails(error));
        })
    };
};

