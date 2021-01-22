import axios from 'axios';
import { userSignUpRequest, userLoginRequest, userSelfRequest } from '../api/user';
import { refreshTokenRequest } from '../api/auth';

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const UPLOAD_AVATAR_IMAGE = 'UPLOAD_AVATAR_IMAGE';
export const CHANGE_USER_INFO = 'CHANGE_USER_INFO';

const fetchUserRequestAction = () => ({
    type: FETCH_USER_REQUEST,
});
const fetchUserSuccessAction = (data) => ({
    type: FETCH_USER_SUCCESS,
    data
});
const fetchUserErrorAction = (message) => ({
    type: FETCH_USER_ERROR,
    message
});

const uploadAvatarImageAction = (imageURL) => ({
    type: UPLOAD_AVATAR_IMAGE,
    imageURL
})

const changeUserInfoAction = (data) => ({
    type: CHANGE_USER_INFO,
    data
})

export function uploadAvatarImage(imageURL){
    return dispatch => {
        dispatch(uploadAvatarImageAction(imageURL))
    }
}

export function changeUserInfo(data){
    return dispatch => {
        dispatch(changeUserInfoAction(data))
    }
}

export function fetchUser(){
    return dispatch => {
        dispatch(fetchUserRequestAction());
        userSelfRequest()
        .then(response => {
            dispatch(fetchUserSuccessAction(response.data));
        })
        .catch(()=> {
            const errorMessage = "An error occured while fetching user";
            dispatch(fetchUserErrorAction(errorMessage));
        })
    }
} 

export function setAutorizationToken(token){
    if (token) {
        axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export function signUpUser(fullname, email, username, password1, password2){

    return userSignUpRequest(fullname, email, username, password1, password2)
    .then(() => 
        {
            return {errors: {}};
        }
    )
    .catch(error => {
        const data = error.response.data;
        const errors = {};
        Object.entries(data).map(([key, value]) => {
            Object.assign(errors, {[key]: value})
        });
        return {errors: errors};
    });
    
}

export function userLogIn(usernameOrEmail, password){
    return userLoginRequest(usernameOrEmail, password)
    .then(
        async response => 
        {
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            return true;
        }
    )
    .catch(
        () => {
            return false;
        }
    )
}

export function refreshAuthorizationToken(refreshToken){
    return refreshTokenRequest(refreshToken)
        .then(
            async response => {
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);

                setAutorizationToken(localStorage.getItem('accessToken'));
            }
        )
        .catch(
            () => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            }
        )
}