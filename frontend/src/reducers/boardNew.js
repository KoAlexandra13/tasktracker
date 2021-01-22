import {
    FETCH_BOARD_REQUEST, FETCH_BOARD_SUCCESS, UPLOAD_BOARD_BACKGROUND_IMAGE, 
    FETCH_BOARD_ERROR, CREATE_BOARD_SET_LOADER
} from '../actions/board';


const initialState = {
    boardTitle: '',
    boardColumns: [],
    boardBackgroundColor: null,
    addBoardBackgroundImage: null,
    boardId: null,
    users: [],
    isFetching: true,
    error: null,
    isLoading: false
}

const createNewBoardReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_BOARD_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_BOARD_SUCCESS:
            return {
                ...state, 
                boardTitle: action.data.name,
                boardColumns: action.data.columns,
                boardBackgroundColor: action.data.background_color,
                addBoardBackgroundImage: action.data.background_image,
                boardId: action.data.id,
                users: action.data.users,
                isFetching: false
            }
        case FETCH_BOARD_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.message
            }
        case UPLOAD_BOARD_BACKGROUND_IMAGE:
            return {
                ...state,
                boardBackgroundURL: action.image,
                boardBackgroundColor: null
            }
        case CREATE_BOARD_SET_LOADER:
            return {
                ...state,
                isLoading: action.data.image_from_url
            }
        default:
            return state;
    }
};

export default createNewBoardReducer;