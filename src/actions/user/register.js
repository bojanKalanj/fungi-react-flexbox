import fungi from '../../apis/fungi';
import {authSuccess} from './auth';

export const registerStart = () => {
    return{
        type: "REGISTER_START"
    }
}

export const registerSuccess = (user) => {
    // authSuccess(user)
    return{
        type: "REGISTER_SUCCESS",
        user: user
    };
};

export const registerFail = (error) => {
    return{
        type: "REGISTER_FAIL",
        error: error
    };
};

export const register = (user) => {
    return dispatch =>{
        dispatch(registerStart());
        

        fungi.post("/register", { user })
        .then(res => {
            console.log(res.data.jwt);
            console.log(res.data.user_id);
            localStorage.setItem('token', res.data.jwt);
            localStorage.setItem('userID', res.data.user_id);
            dispatch(authSuccess(res.data));
            dispatch(registerSuccess(res.data));
        }).catch(err => {
            console.log(err);
            dispatch(registerFail(err));
        })
    };
};