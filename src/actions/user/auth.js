import fungi from '../../apis/fungi';

export const authStart = () => {
    return{
        type: "AUTH_START"
    }
}

export const authSuccess = (authData) => {
    return{
        type: "AUTH_SUCCESS",
        token: authData
    };
};

export const authFail = (error) => {
    return{
        type: "AUTH_FAIL",
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch =>{
        dispatch(authStart());
        
        const auth = {
            email: email,
            password: password
        }

        fungi.post("/login", { auth })
        .then(res => {
            console.log(res);
            console.log(res.data.jwt);
            dispatch(authSuccess(res.data.jwt));
        }).catch(err => {
            console.log(err);
            dispatch(authFail(err));
        })
    };
};