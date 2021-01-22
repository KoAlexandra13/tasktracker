import { createNewBoardRequest, uploadBoardImageRequest } from '../api/board'

export const UPLOAD_BOARD_BACKGROUND_IMAGE = 'UPLOAD_BOARD_BACKGROUND_IMAGE';
export const FETCH_BOARD_SUCCESS = 'FETCH_BOARD_SUCCESS';
export const FETCH_BOARD_REQUEST = 'FETCH_BOARD_REQUEST';
export const FETCH_BOARD_ERROR = 'FETCH_BOARD_ERROR';
export const CREATE_BOARD_SET_LOADER = 'SET_LOADER'

const addBoardBackgroundImageAction = (image) => ({
    type: UPLOAD_BOARD_BACKGROUND_IMAGE,
    image
});
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
})


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

export function uploadImage(boardId, data){
    return dispatch => {
        console.log(boardId, data)
        uploadBoardImageRequest(boardId, data)
        .then(response => {
            console.log(response.data)
            dispatch(addBoardBackgroundImageAction(response.data));
        })
        .catch(()=> {
            const errorMessage = "An error occured while image uploading";
            console.log(errorMessage);
        })
    }
}

/*export function createBoard(data){
    return createNewBoardRequest(data)
    .then(response => {
        addBoard(response.data);
        return true;
    })
    .catch(() => {
        return false;
    })
}*/