import {
    ADD_BOARD_TITLE, ADD_COLUMN_NAME, ADD_BOARD_BACKGROUND_COLOR,
    ADD_BOARD_BACKGROUND_URL
} from '../actions/board';


const initialState = {
    boardTitle: '',
    boardColumns: [],
    boardBackgroundColor: null,
    boardBackgroundURL: null
}

const createNewBoardReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_BOARD_TITLE:
            return {...state, boardTitle: action.title}; 
        case ADD_COLUMN_NAME:
            return {...state, boardColumns: action.columnName};
        case ADD_BOARD_BACKGROUND_COLOR:
            return {...state, boardBackgroundColor: action.color, boardBackgroundURL: null};
        case ADD_BOARD_BACKGROUND_URL:
            return {...state, boardBackgroundURL: action.url, boardBackgroundColor: null} 
        default:
            return state;
    }
};

export default createNewBoardReducer;