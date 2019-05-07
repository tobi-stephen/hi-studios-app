import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
//import PropTypes from 'prop-types';
import configureStore from './configureStore';

const store = configureStore();

const Root = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
        
    )
};

//Root.propTypes = {
    //store: PropTypes.object.isRequired,
//}

export default Root;