import { ADD_PERSONAL_BOARD, ADD_TEAM_BOARD } from '../actions/boardList';

const initialState = {
    personalBoardList: [],
    teamBoardList: []
}

const addBoardReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_PERSONAL_BOARD:
            return {...state, personalBoardList: state.personalBoardList.concat(action.personalBoardName)}; 
        case ADD_TEAM_BOARD:
            return {...state, teamBoardList: state.teamBoardList.concat(action.teamBoardName)};
        default:
            return state;
    }
};

export default addBoardReducer;