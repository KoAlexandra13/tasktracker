import { getBoardListRequest } from '../api/board'

export const ADD_PERSONAL_BOARD = 'ADD_PERSONAL_BOARD';

const addPersonalBoardAction = (data) => ({
    type: ADD_PERSONAL_BOARD,
    data
});

export function getBoardTitlesList(){
    return dispatch => {
        getBoardListRequest()
        .then(response => {
            const boards = response.data.map(element => {
                return element;
            });
            dispatch(addPersonalBoardAction(boards))
        })
        .catch(error => {
            console.log(error)
        });
    }
   
}