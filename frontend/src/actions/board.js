// Actions Type
export const ADD_BOARD_TITLE = 'ADD_BOARD_TITLE';
export const ADD_COLUMN_NAME = 'ADD_COLUNM_NAME';
export const ADD_BOARD_BACKGROUND_COLOR = 'ADD_BOARD_BACKGROUND_COLOR';
export const ADD_BOARD_BACKGROUND_URL = 'ADD_BOARD_BACKGROUND_URL';

// Actions
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

export function createNewBoardTitle(title){
    return dispatch => {
        dispatch(addBoardTitleAction(title))
    }
}

export function createNewBoardColumn(columnName){
    return dispatch => {
        dispatch(addColumnNameAction(columnName))
    }
}

export function createNewBoardBackgroundColor(color){
    return dispatch => {
        dispatch(addBoardBackgroundColorAction(color))
    }
}

export function createNewBoardBackgroundURL(url){
    return dispatch => {
        dispatch(addBoardBackgroundURLAction(url))
    }
}