import axios from 'axios';
import {refreshAuthorizationToken} from '../actions/user';


export const BACKEND_API_URL = process.env.NODE_ENV == 'development' ? 'http://localhost:8000/api' : '/api';


export function initAxios(){
    axios.interceptors.request.use(
        config => {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken){
                config.headers['Authorization'] = `JWT ${accessToken}`;
            }
            return config;
        },
        error => {
            if (error.config && error.response && error.response.status === 401) {
            return refreshAuthorizationToken().then(
                token => {
                    if (!token){
                        window.location.reload();
                    }
                    error.config.headers['Authorization'] = `JWT ${token}`;
                    return axios.request(error.config);
                });
            }
        
            return Promise.reject(error);
        });
}