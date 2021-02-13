import axios from 'axios';
import {BACKEND_API_URL} from './index';


export function userLoginRequest(usernameOrEmail, password){
    const config = {
        url: `${BACKEND_API_URL}/token/`, 
        method: 'POST',
        data: {
                username: usernameOrEmail,
                password: password
            }
    };
    return axios(config);
}


export function refreshTokenRequest(refreshToken){
    const config = {
        url: `${BACKEND_API_URL}/token/refresh/`, 
        method: 'POST',
        data: {'refresh': refreshToken}
    };
    return axios(config);
}
