import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducers from './src/redux/auth/reducer.js';
import thunkMiddleware from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import promise from './promise';
//import AsyncStorage from '@react-native-community/async-storage';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const reducers = combineReducers({
    auth: authReducers,
    //app: appReducers,
});

const persistConfig = {
    key: 'state',
    storage,
    timeout: 0,
  }

const configureStore = () => {
    const persistedReducer = persistReducer(persistConfig, reducers);
    const enhancer = compose(
        applyMiddleware(thunkMiddleware, promise),
        devTools({
          name: 'nativestarterkit', realtime: true,
        }),
      );
    const store = createStore(
        persistedReducer,
        enhancer
    );

  let persistor = persistStore(store)
  return { store, persistor }
}

export default configureStore;