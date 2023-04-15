import { SIGNUP, LOGIN } from '../actions/auth.actions';

const initialState = {
    token: null,
    userId: null,
    email: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                email: action.email
            };
        case LOGIN:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                email: action.email
            };
        default:
            return state;
    }
}

export default authReducer;