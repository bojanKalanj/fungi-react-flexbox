import fungi from '../../apis/fungi';

export const fetchHabitatsStart = () => {
    return{
        type: "FETCH_HABITATS_START"
    }
}

export const fetchHabitatsuccess = (habitatCategories) => {
    return{
        type: "FETCH_HABITATS_SUCCESS",
        habitatCategories: habitatCategories
    };
};

export const fetchHabitatsFails = (error) => {
    return{
        type: "FETCH_HABITATS_FAIL",
        error: error
    };
};

export const fetchHabitats = () => {
    return dispatch =>{
        dispatch(fetchHabitatsStart());
        
        fungi.get("/habitat_categories")
        .then(response => {
            dispatch(fetchHabitatsuccess(response.data));
        })
        .catch(error => {
            dispatch(fetchHabitatsFails(error));
        })
    };
};

