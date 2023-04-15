import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import authReducer from './reducers/auth.reducer';
import userReducer from './reducers/user.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));