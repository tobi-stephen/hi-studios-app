/**
 * @format
 *
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Root from './Root';

AppRegistry.registerComponent(appName, () => Root); */


import React from 'react';
import {AppRegistry} from 'react-native';
import Root from './Root';
import {name as appName} from './app.json';
//import configureStore from './configureStore';

//const store = configureStore();

AppRegistry.registerComponent(appName, () => Root); 
