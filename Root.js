import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
//import PropTypes from 'prop-types';
import { StyleProvider } from 'native-base';
import getTheme from './src/themes/components';
import platform from './src/themes/variables/platform';
import configureStore from './configureStore';
import { Spinner } from 'native-base';

const { store, persistor } = configureStore();
console.log(store.getState());
const Root = () => {
    return (
        <StyleProvider style={getTheme(platform)}>
            <Provider store={store}>
                <PersistGate loading={<Spinner />} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        </StyleProvider>
    )
};

//Root.propTypes = {
    //store: PropTypes.object.isRequired,
//}

export default Root;