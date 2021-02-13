import {
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    UPLOAD_AVATAR_IMAGE,
    CHANGE_USER_INFO, 
    USER_WILL_LOGIN
} from '../actions/user';

const initialState = {
    fullName: '',
    username: '',
    email: '',
    organization: '',
    userIcon: '',
    userId: '',
    userInfoAboutYourself: '',
    isFetching: true,
    error: null,
    verifyEmail: false
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
                userInfoAboutYourself: action.data.about,
                isFetching: false,
                verifyEmail: action.data.is_email_verified
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
                userInfoAboutYourself: action.data.about
            }
        case USER_WILL_LOGIN:
            return {
                ...state,
                isFetching: false
            }
        default:
            return state;
    }
}

export default userReducer;