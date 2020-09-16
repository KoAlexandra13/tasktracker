export const ADD_PERSONAL_BOARD = 'ADD_PERSONAL_BOARD';
export const ADD_TEAM_BOARD = 'ADD_TEAM_BOARD';

const addPersonalBoardAction = (personalBoardName) => ({
    type: ADD_PERSONAL_BOARD,
    personalBoardName
});


const addTeamBoardAction = (teamBoardName) => ({
    type: ADD_TEAM_BOARD,
    teamBoardName
});

export function addPersonalBoard(personalBoardName){
    return dispatch => {
        dispatch(addPersonalBoardAction(personalBoardName))
    }
};

export function addTeamBoard(teamBoardName){
    return dispatch => {
        dispatch(addTeamBoardAction(teamBoardName))
    }
};