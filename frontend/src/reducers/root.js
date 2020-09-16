import { combineReducers } from "redux";
import createNewBoardReducer from './boardNew'
import addBoardReducer from './addBoard'

// Root Reducers
export const rootReducer = combineReducers({
    newBoardCreator: createNewBoardReducer,
    addBoard: addBoardReducer
 });
