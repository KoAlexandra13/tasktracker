import axios from 'axios'

export function createNewBoardRequest(data){
    const config = {
        url: 'http://127.0.0.1:8000/api/tables/', 
        method: 'POST',
        data
    };
    return axios(config);
}

export function uploadBoardImageRequest(tableId, imageURL){
    const config = {
        url: `http://127.0.0.1:8000/api/tables/${tableId}/`,
        method: 'PATCH',
        imageURL
    };
    return axios(config);
}
