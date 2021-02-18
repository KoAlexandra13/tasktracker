import _ from 'lodash'
import {
    FETCH_BOARD_REQUEST, FETCH_BOARD_SUCCESS, UPLOAD_BOARD_BACKGROUND_IMAGE, 
    FETCH_BOARD_ERROR, CREATE_BOARD_SET_LOADER, CHANGE_BOARD_TITLE,
    CHANGE_BOARD_COLUMNS, ADD_NEW_COLUMN, ADD_NEW_TASK, CHANGE_BOARD_TASK,
    DELETE_BOARD_TASK
} from '../actions/board';


const initialState = {
    boardTitle: '',
    boardColumns: [],
    boardBackgroundColor: null,
    boardBackgroundImage: null,
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
                boardTitle: action.data.name,
                boardColumns: action.data.columns.sort(function(a, b){
                    return a.index - b.index
                }),
                boardBackgroundColor: action.data.background_color,
                boardBackgroundImage: action.data.background_image,
                boardId: action.data.id,
                users: action.data.users,
                isFetching: false,
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
                boardBackgroundImage: action.image,
                boardBackgroundColor: null
            }
        case CREATE_BOARD_SET_LOADER:
            return {
                ...state,
                isLoading: action.data
            }
        case CHANGE_BOARD_TITLE: 
            return {
                ...state,
                boardTitle: action.data
            }
        case CHANGE_BOARD_COLUMNS: 
            return {
                ...state, 
                boardColumns: action.data
            }
        case ADD_NEW_COLUMN: 
            return {
                ...state,
                boardColumns: state.boardColumns.concat(action.data)
            }
        case ADD_NEW_TASK:
            const columns = Array.from(state.boardColumns);
            const column = columns.find(column => column.id === action.data.column);
            const newTasks = column.tasks.concat(action.data).sort(function(a, b) {
                return a.index - b.index;
            });
            
            const newColumn = {
                ...column,
                tasks: newTasks
            }
            
            columns.splice(newColumn.index, 1, newColumn);
            
            return {
                ...state,
                boardColumns: columns
            };
        case CHANGE_BOARD_TASK: 
            const columnsTmp = Array.from(state.boardColumns);
            const changedTask = columnsTmp.find(column => {
                return column.tasks.find(task => task.id === action.data.id)
            }).tasks;

            changedTask.forEach((task, index) => {
                if(task.id === action.data.id){
                    changedTask[index] = action.data
                }
            });

            return {
                ...state,
                boardColumns: columnsTmp
            };
        case DELETE_BOARD_TASK: 
            const columns_ = Array.from(state.boardColumns);
            let tasks_ = columns_.find(column => {
                return column.tasks.find(task => task.id === action.data)
            }).tasks;

            tasks_ = _.remove(tasks_, function(task) { 
                return task.id === action.data;
            })

            return {
                ...state,
                boardColumns: columns_
            };
        default:
            return state;
    }
};

export default createNewBoardReducer;