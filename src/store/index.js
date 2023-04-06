import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import authReducer from './reducers/auth.reducer';

const rootReducer = combineReducers({
    auth: authReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));