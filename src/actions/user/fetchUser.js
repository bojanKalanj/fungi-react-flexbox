import fungi from '../../apis/fungi';

export const setUser = user => {
    return{
        type: 'FETCH_USER',
        payload: user
    }
}

export const fetchUser = (userId, token) => {
    return dispatch => (
       fungi.get(`/users/${userId}`)
        .then(response => {
            dispatch(setUser(response.data))
        })
        .catch(error => console.log(error))
    )
};