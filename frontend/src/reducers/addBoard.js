import { ADD_PERSONAL_BOARD } from '../actions/boardList';

const initialState = {
    personalBoardList: [],
}

const addBoardReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_PERSONAL_BOARD:
            return {
                ...state, 
                personalBoardList: action.data
            }; 
        default:
            return state;
    }
};

export default addBoardReducer;