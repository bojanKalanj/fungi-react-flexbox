// import fungi from '../../apis/fungi';

// export const setUser = user => {
//     return{
//         type: 'FETCH_USER',
//         payload: user
//     }
// }

// export const fetchUser = (userId, token) => {
//     return dispatch => (
//        fungi.get(`/users/${userId}`)
//         .then(response => {
//             dispatch(setUser(response.data))
//         })
//         .catch(error => console.log(error))
//     )
// };

import fungi from '../../apis/fungi';

export const fetchUserStart = () => {
    return{
        type: "FETCH_USER_START"
    }
}

export const fetchUserSuccess = (user) => {
    return{
        type: "FETCH_USER_SUCCESS",
        user: user
    };
};

export const fetchUserFail = (error) => {
    return{
        type: "FETCH_USER_FAIL",
        error: error
    };
};

export const fetchUser = (user, userId) => {
    return dispatch =>{
        dispatch(fetchUserStart());
        fungi.get(`/users/${userId}`)
        .then(res => {
            dispatch(fetchUserSuccess(res.data));
        }).catch(err => {
            dispatch(fetchUserFail(err));
        })
    };
};