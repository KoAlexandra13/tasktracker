import { 
    createNewBoardRequest, uploadBoardImageRequest, getBoardRequest, 
    addNewColumnRequest, addNewTaskRequest, changeTaskRequest, 
    deleteTaskRequest, changeColumnTitleRequest, deleteColumnRequest 
} from '../api/board';

export const UPLOAD_BOARD_BACKGROUND_IMAGE = 'UPLOAD_BOARD_BACKGROUND_IMAGE';
export const FETCH_BOARD_SUCCESS = 'FETCH_BOARD_SUCCESS';
export const FETCH_BOARD_REQUEST = 'FETCH_BOARD_REQUEST';
export const FETCH_BOARD_ERROR = 'FETCH_BOARD_ERROR';
export const CREATE_BOARD_SET_LOADER = 'SET_LOADER';
export const CHANGE_BOARD_TITLE = 'CHANGE_BOARD_TITLE';
export const CHANGE_BOARD_TASK = 'CHANGE_BOARD_TASK';
export const CHANGE_BOARD_COLUMNS = 'CHANGE_BOARD_COLUMNS';
export const ADD_NEW_COLUMN = 'ADD_NEW_COLUMN';
export const ADD_NEW_TASK = 'ADD_NEW_TASK';
export const DELETE_BOARD_TASK = 'DELETE_BOARD_TASK';
export const DELETE_BOARD_COLUMN = 'DELETE_BOARD_COLUMN';
export const CHANGE_COLUMN_TITLE = 'CHANGE_COLUMN_TITLE';

const fetchBoardRequestAction = () => ({
    type: FETCH_BOARD_REQUEST,
});
const fetchBoardSuccessAction = (data) => ({
    type: FETCH_BOARD_SUCCESS,
    data
});
const fetchBoardErrorAction = (message) => ({
    type: FETCH_BOARD_ERROR,
    message
});
const setLoaderAction = (data) => ({
    type: CREATE_BOARD_SET_LOADER,
    data 
});
const changeBoardTitleAction = (data) => ({
    type: CHANGE_BOARD_TITLE,
    data 
});
const changeBoardTaskAction = (data) => ({
    type: CHANGE_BOARD_TASK,
    data 
});
const changeBoardColumnsAction = (data) => ({
    type: CHANGE_BOARD_COLUMNS,
    data
});
const addNewColumnAction = (data) => ({
    type: ADD_NEW_COLUMN,
    data
});
const addNewTaskAction = (data) => ({
    type: ADD_NEW_TASK,
    data
})
const deleteTaskAction = (data) => ({
    type: DELETE_BOARD_TASK,
    data
})
const deleteColumnAction = (data) => ({
    type: DELETE_BOARD_COLUMN,
    data
});
const changeColumnTitleAction = (data) => ({
    type: CHANGE_COLUMN_TITLE,
    data
});
export function changeBoardTitle(data){
    return dispatch => {
        dispatch(changeBoardTitleAction(data))
    }
};
export function changeColumnTitle(data, id){
    return dispatch => {
        return changeColumnTitleRequest(data, id)
        .then(
            response => dispatch(changeColumnTitleAction(response))
        )
        .catch(
            () => console.log('An error occured while column title changing')
        )
    }
};

export function changeBoardTask(data, id){
    return async dispatch => {
        return changeTaskRequest(data, id)
        .then(
            response => dispatch(changeBoardTaskAction(response.data))
        )
        .catch(
            () => console.log('An error occured while changing task')
        )
    }
};

export function deleteTask(id){
    return dispatch => {
        return deleteTaskRequest(id)
        .then(
            () => dispatch(deleteTaskAction(id))
        )
        .catch(
            () => console.log('An error occured while task deleting')
        )
    }
}
export function deleteColumn(id){
    return dispatch => {
        return deleteColumnRequest(id)
        .then(
            () => dispatch(deleteColumnAction(id))
        )
        .catch(
            () => console.log('An error occured while column deleting')
        )
    }
}
export function changeBoardColumns(data){
    return dispatch => {
        dispatch(changeBoardColumnsAction(data))
    }
}

export function fetchBoard(data){
    return async dispatch => {
        dispatch(fetchBoardRequestAction());
        return createNewBoardRequest(data)
        .then(response => {
            dispatch(fetchBoardSuccessAction(response.data));
            return response.data.id;
        })
        .catch(()=> {
            const errorMessage = "An error occured while fetching board";
            dispatch(fetchBoardErrorAction(errorMessage));
        })
    }
} 

export function setLoader(data){
    return dispatch => {
        dispatch(setLoaderAction(data))
    }
}

export function uploadImage(boardId, imgData){
    return uploadBoardImageRequest(boardId, imgData)
        .catch(()=> {
            console.log("An error occured while image uploading");
        })
    
}

export function getBoard(id){
    return async dispatch => {
        dispatch(fetchBoardRequestAction());
        return getBoardRequest(id)
        .then(response => {
            dispatch(fetchBoardSuccessAction(response.data));
        })
        .catch(()=> {
            console.log("An error occured while fetching board");
        })
    }
}

export function addNewColumn(data){
    return async dispatch => {
        return addNewColumnRequest(data)
        .then(response => {
            dispatch(addNewColumnAction(response.data));
        })
        .catch(()=> {
            console.log("An error occured while adding new column");
        })
    }
}

export function addNewTask(data){
    return async dispatch => {
        return await addNewTaskRequest(data)
        .then(response => {
            dispatch(addNewTaskAction(response.data))
        })
        .catch(() => {
            console.log("An error occured while adding new task");
        })
    }
}