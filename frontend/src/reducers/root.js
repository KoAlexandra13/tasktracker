import { combineReducers } from 'redux';
import createNewBoardReducer from './boardNew';
import addBoardReducer from './addBoard';
import userReducer from './user' 

// Root Reducers
export const rootReducer = combineReducers({
    newBoardCreator: createNewBoardReducer,
    addBoard: addBoardReducer,
    user: userReducer,
 });
