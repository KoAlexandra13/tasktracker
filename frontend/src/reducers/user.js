import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR
} from '../actions/user';

const initialState = {
    fullName: '',
    username: '',
    email: '',
    organization: '',
    userIcon: '',
    userId: '',
    isFetching: true,
    error: null
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USER_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_USER_SUCCESS:
            return {
                ...state, 
                fullName: action.data.fullname,
                username: action.data.username,
                email: action.data.email,
                organization: action.data.organization,
                userIcon: action.data.image,
                userId: action.data.id,
                isFetching: false
            }
        case FETCH_USER_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.message
            }
        default:
            return state;
    }
}

export default userReducer;