import axios from 'axios'

export function refreshTokenRequest(refreshToken){
    const config = {
        url: 'http://127.0.0.1:8000/api/token/refresh/', 
        method: 'POST',
        data: {'refresh': refreshToken}
    };
    return axios(config);
}
