import axios from 'axios'
import {BACKEND_API_URL} from './index';


export function userSignUpRequest(fullName, email, username, password1, password2, organization){
    const config = {
        url: `${BACKEND_API_URL}/users/sign_up/`, 
        method: 'POST',
        data: {
                fullname: fullName,
                email: email,
                username: username,
                password1: password1,
                password2: password2,
                organization: organization
            }
    };
    return axios(config);
}

export function userSelfRequest(){
    const config = {
        url: `${BACKEND_API_URL}/users/self/`, 
        crossDomain: true,
        method: 'GET',
    };
    return axios(config);
}

export function uploadUserAvatarRequest(userId, data){
    const config = {
        url: `${BACKEND_API_URL}/users/${userId}/`, 
        method: 'PATCH',
        data,
    }
    return axios(config)
}

export function changeUserInfoRequest(userId, data){
    const config = {
        url: `${BACKEND_API_URL}/users/${userId}/`, 
        method: 'PATCH',
        data,
    }
    return axios(config)
}

export function verifyEmailRequest(data){
    const config = {
        url: `${BACKEND_API_URL}/users/email-activate/`, 
        method: 'POST',
        data
    };
    return axios(config);
}

export function resendVerifyEmailRequest(){
    const config = {
        url: `${BACKEND_API_URL}/users/resend-activation-mail/`, 
        method: 'POST'
    };
    return axios(config);
}



