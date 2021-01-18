import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    UPLOAD_AVATAR_IMAGE,
    CHANGE_USER_INFO
} from '../actions/user';

const initialState = {
    fullName: '',
    username: '',
    email: '',
    organization: '',
    userIcon: '',
    userId: '',
    //userInfoAboutYourself: '',
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
                //userInfoAboutYourself: action.data.
                isFetching: false
            }
        case FETCH_USER_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.message
            }
        case UPLOAD_AVATAR_IMAGE:
            return {
                ...state,
                userIcon: action.imageURL,
            }
        case CHANGE_USER_INFO:
            return {
                ...state, 
                fullName: action.data.fullname,
                username: action.data.username,
                email: action.data.email,
                organization: action.data.organization,
                //userInfoAboutYourself: action.data.
            }
        default:
            return state;
    }
}

export default userReducer;