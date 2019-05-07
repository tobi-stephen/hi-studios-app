import { combineReducers } from "redux";
import * as types from './actionTypes';
import signinReducer from "./reducers/signinReducer";

const signin = (signin={}, action) => {
    switch(action.type) { 
        case types.AUTH_SIGN_IN:
            return signinReducer(signin, action);
        default:
            return signin;
    }
};

const authReducers = combineReducers({
    signin,
});

export default authReducers;