import fungi from '../../apis/fungi';

export const authStart = () => {
    return{
        type: "AUTH_START"
    }
}

export const authSuccess = (authData) => {
    return{
        type: "AUTH_SUCCESS",
        authData: authData
    };
};

export const authFail = (error) => {
    return{
        type: "AUTH_FAIL",
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');

    return{
        type: "LOGOUT",
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
            console.log(res.data.jwt);
            console.log(res.data.user_id);
            localStorage.setItem('token', res.data.jwt);
            localStorage.setItem('userID', res.data.user_id);

            dispatch(authSuccess(res.data));
        }).catch(err => {
            console.log(err);
            dispatch(authFail(err));
        })
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userID = localStorage.getItem('userID');
        const authData = { "jwt": token, "user_id": userID };

        if(!token){
            dispatch(logout());
        }else{
            dispatch(authSuccess(authData));
        }
    }
}