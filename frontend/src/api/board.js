import axios from 'axios'
import {BACKEND_API_URL} from './index';

export function createNewBoardRequest(data){
    const config = {
        url: `${BACKEND_API_URL}/tables/`, 
        method: 'POST',
        data
    };
    return axios(config);
}

export function uploadBoardImageRequest(tableId, imgData){
    const data = new FormData();
    data.append('background_image', imgData);
    
    const config = {
        url: `${BACKEND_API_URL}/tables/${tableId}/`,
        method: 'PATCH',
        data
    };
    return axios(config);
}

export function getBoardListRequest(){
    const config = {
        url: `${BACKEND_API_URL}/tables/`,
        method: 'GET'
    };
    return axios(config);
}

export function getBoardRequest(id){
    const config = {
        url: `${BACKEND_API_URL}/tables/${id}/`,
        method: 'GET'
    };
    return axios(config);
}

export function editBoardNameRequest(name, id){
    const config = {
        url: `${BACKEND_API_URL}/tables/${id}/`,
        method: 'PATCH',
        data: {
            name: name 
        }
    }
    return axios(config);
}

export async function editBoardColumnsOrderRequest(columnsId, tableId){
    const config = {
        url: `${BACKEND_API_URL}/tables/${tableId}/`,
        method: 'PATCH',
        data: {
            ordered_columns: columnsId
        }
    }
    return axios(config);
}

export function editTaskPositionRequest(tasksId, columnId){
    const config = {
        url: `${BACKEND_API_URL}/table-columns/${columnId}/`,
        method: 'PATCH',
        data: {
            ordered_tasks: tasksId
        }
    }
    return axios(config);
}

export function addNewColumnRequest(data){
    const config = {
        url: `${BACKEND_API_URL}/table-columns/`,
        method: 'POST',
        data
    }
    return axios(config);
}

export function addNewTaskRequest(data){
    const config = {
        url: `${BACKEND_API_URL}/tasks/`,
        method: 'POST',
        data
    }
    return axios(config);
}

export function changeTaskRequest(data, id){
    const config = {
        url: `${BACKEND_API_URL}/tasks/${id}/`,
        method: 'PATCH',
        data
    }
    return axios(config);
}

 export function deleteTaskRequest(id){
    const config = {
        url: `${BACKEND_API_URL}/tasks/${id}/`,
        method: 'DELETE',
    }
    return axios(config);
 }

 export function changeColumnTitleRequest(data, id){
    const config = {
        url: `${BACKEND_API_URL}/table-columns/${id}/`,
        method: 'PATCH',
        data
    }
    return axios(config);
 }

 export function deleteColumnRequest(id){
    const config = {
        url: `${BACKEND_API_URL}/table-columns/${id}/`,
        method: 'DELETE',
    }
    return axios(config);
 }