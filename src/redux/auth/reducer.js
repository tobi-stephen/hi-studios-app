import { combineReducers } from "redux";
import * as types from './actionTypes';
import signinReducer from "./reducers/signinReducer";
import verifyCodeReducer from "./reducers/verifyCodeReducer";
import addOnboardReducer from "./reducers/addOnboardReducer";
import addSignupReducer from "./reducers/addSignupReducer";
import setLoadingReducer from "./reducers/setLoadingReducer";
import setAccessTokenReducer from "./reducers/setAccessTokenReducer";
import setCo6sReducer from "./reducers/setCo6sReducer";

const signin = (signin={}, action) => {
    switch(action.type) { 
        case types.AUTH_SIGN_IN:
            return signinReducer(signin, action);
        default:
            return signin;
    }
};

const verifyCode = (verifyCode="", action) => {
    switch(action.type) {
        case types.AUTH_VERIFY_CODE:
            return verifyCodeReducer(verifyCode, action);
        default:
            return verifyCode;
    }
};

const onboard = (onboard={}, action) => {
    switch(action.type) {
        case types.AUTH_ONBOARD_DATA:
            return addOnboardReducer(onboard, action);
        default:
            return onboard;
    }
};

const signup = (signup={}, action) => {
    switch(action.type) {
        case types.AUTH_SIGNUP_DATA:
            return addSignupReducer(signup, action);
        default:
            return signup;
    }
};

const loading = (loading=false, action) => {
    switch(action.type) {
        case types.AUTH_LOADING:
            return setLoadingReducer(loading, action);
        default:
            return loading;
    }
}

const access_token = (access_token="", action) => {
    switch(action.type) {
        case types.AUTH_SET_ACCESS_TOKEN:
            return setAccessTokenReducer(access_token, action);
        default:
            return access_token;
    }
};

const co6ById = (co6ById={}, action) => {
    switch(action.type) {
        case types.AUTH_ADD_CO6S:
            return setCo6sReducer(co6ById, action);
        default:
            return co6ById;
    }
}

const authReducers = combineReducers({
    signin,
    verifyCode,
    onboard,
    signup,
    loading,
    access_token,
    co6ById,
});

export default authReducers;