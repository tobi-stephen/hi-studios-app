import { createStore, combineReducers, applyMiddleware } from 'redux';
import BursarStorage from './src/Services/BursarStorage';
import throttle from 'lodash/throttle';
import authReducers from './src/redux/auth/reducer.js';
import thunkMiddleware from 'redux-thunk';

const reducers = combineReducers({
    auth: authReducers,
    //app: appReducers,
});

const configureStore = () => {
    const persistedState = BursarStorage.loadState();
    //console.log(persistedState.getState());
    const store = createStore(
        reducers,
        persistedState,
        applyMiddleware(thunkMiddleware)
    );

    store.subscribe(throttle(() => {
        console.log(store.getState())
        BursarStorage.saveState(store.getState());
    }, 1000));

    return store;
}

export default configureStore;