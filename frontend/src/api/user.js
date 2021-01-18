import axios from 'axios'

export function userSignUpRequest(fullName, email, username, password1, password2){
    const config = {
        url: 'http://127.0.0.1:8000/api/users/sign_up/', 
        method: 'POST',
        data: {
                fullname: fullName,
                email: email,
                username: username,
                password1: password1,
                password2: password2
            }
    };
    return axios(config);
}

export function userLoginRequest(usernameOrEmail, password){
    const config = {
        url: 'http://127.0.0.1:8000/api/token/', 
        method: 'POST',
        data: {
                username: usernameOrEmail,
                password: password
            }
    };
    return axios(config);
}

export function userSelfRequest(){
    const config = {
        url: 'http://127.0.0.1:8000/api/users/self/', 
        crossDomain: true,
        method: 'GET',
    };
    return axios(config);
}

export function uploadUserAvatarRequest(userId, data){
    const config = {
        url: `http://127.0.0.1:8000/api/users/${userId}/`, 
        method: 'PATCH',
        data,
        //headers: {
         //   'Content-Type': 'multipart/form-data'
        //}
    }
    return axios(config)
}



