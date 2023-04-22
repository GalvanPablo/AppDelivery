import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import authReducer from './reducers/auth.reducer';
import userReducer from './reducers/user.reducer';
import categoriesReducer from './reducers/categories.reducer';
import productsReducer from './reducers/products.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    categories: categoriesReducer,
    products: productsReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));