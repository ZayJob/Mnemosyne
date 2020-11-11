import axios from 'axios';
import * as actionTypes from './actionTypes';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, user_id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        user_id: user_id
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('user_id');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
    
        axios.post('http://127.0.0.1:8000/auth/token/login/', {
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.auth_token;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
        })

        setTimeout(() => {
            const token = localStorage.getItem('token');

            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: "Token " + token
            }
            axios.get('http://0.0.0.0:8000/auth/users/me/')
            .then(res => {
                const user_id = parseInt(res.data.id, 10);
    
                localStorage.setItem('user_id', user_id);
    
                dispatch(authSuccess(token, user_id));
                dispatch(checkAuthTimeout(3600));
            })
            .catch(err => {
                dispatch(authFail(err))
            })
        }, 1000)
    }
}

export const authSignup = (username, email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/auth/users/', {
            username: username,
            email: email,
            password: password,
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authActivation = (uid, token) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/auth/users/activation/', {
            uid: uid,
            token: token
        })
        .then(res => {
            /*const token = res.data.auth_token;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));*/
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const user_id = localStorage.getItem('user_id');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, user_id));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
            }
        }
    }
}