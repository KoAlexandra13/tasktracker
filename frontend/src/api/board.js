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

export function getBoardListRequest(){
    const config = {
        url: 'http://127.0.0.1:8000/api/tables/',
        method: 'GET'
    };
    return axios(config);
}

export function getBoardRequest(id){
    const config = {
        url: `http://127.0.0.1:8000/api/tables/${id}/`,
        method: 'GET'
    };
    return axios(config);
}

export function editBoardNameRequest(name, id){
    const config = {
        url: `http://127.0.0.1:8000/api/tables/${id}/`,
        method: 'PATCH',
        data: {
            name: name 
        }
    }
    return axios(config);
}

export async function editBoardColumnsOrderRequest(columnsId, tableId){
    const config = {
        url: `http://127.0.0.1:8000/api/tables/${tableId}/`,
        method: 'PATCH',
        data: {
            ordered_columns: columnsId
        }
    }
    return axios(config);
}

export function editTaskPositionRequest(tasksId, columnId){
    const config = {
        url: `http://127.0.0.1:8000/api/table-columns/${columnId}/`,
        method: 'PATCH',
        data: {
            ordered_tasks: tasksId
        }
    }
    return axios(config);
}

export function addNewColumnRequest(data){
    const config = {
        url: `http://127.0.0.1:8000/api/table-columns/`,
        method: 'POST',
        data
    }
    return axios(config);
}

export function addNewTaskRequest(data){
    const config = {
        url: `http://127.0.0.1:8000/api/tasks/`,
        method: 'POST',
        data
    }
    return axios(config);
}
