import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

import authReducer from './reducers/auth.reducer';
import userReducer from './reducers/user.reducer';
import categoriesReducer from './reducers/categories.reducer';
import productsReducer from './reducers/products.reducer';
import cartReducer from './reducers/cart.reducer';
import pucharseReducer from './reducers/pucharse.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
    pucharse: pucharseReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const storePersisted = persistStore(store);

//export default createStore(rootReducer, applyMiddleware(thunk));