import axios from 'axios'

export function createNewBoardRequest(data){
    const config = {
        url: 'http://127.0.0.1:8000/api/tables/', 
        method: 'POST',
        data
    };
    return axios(config);
}
