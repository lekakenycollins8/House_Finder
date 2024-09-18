import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
    user: userReducer,
    // other reducers if any
});

const store = createStore(rootReducer);

export default store;
