import { createNewBoardRequest } from '../api/board'
export const ADD_BOARD_TITLE = 'ADD_BOARD_TITLE';
export const ADD_COLUMN_NAME = 'ADD_COLUNM_NAME';
export const ADD_BOARD_BACKGROUND_COLOR = 'ADD_BOARD_BACKGROUND_COLOR';
export const ADD_BOARD_BACKGROUND_URL = 'ADD_BOARD_BACKGROUND_URL';

const addColumnNameAction = (columnName) => ({
    type: ADD_COLUMN_NAME,
    columnName
});

const addBoardTitleAction = (title) => ({
    type: ADD_BOARD_TITLE,
    title
});

const addBoardBackgroundColorAction = (color) => ({
    type: ADD_BOARD_BACKGROUND_COLOR,
    color
});

const addBoardBackgroundURLAction = (url) => ({
    type: ADD_BOARD_BACKGROUND_URL,
    url
})

export function addBoardTitle(title){
    return dispatch => {
        dispatch(addBoardTitleAction(title))
    }
}

export function addBoardColumn(columnName){
    return dispatch => {
        dispatch(addColumnNameAction(columnName))
    }
}

export function addBoardBackgroundColor(color){
    return dispatch => {
        dispatch(addBoardBackgroundColorAction(color))
    }
}

export function addBoardBackgroundURL(url){
    return dispatch => {
        dispatch(addBoardBackgroundURLAction(url))
    }
}

export function createBoard(data){
    return createNewBoardRequest(data)
    .then(response => {
        console.log(response.data);
        return true;
    })
    .catch(error => {
        console.log(error);
        return false;
    })
}