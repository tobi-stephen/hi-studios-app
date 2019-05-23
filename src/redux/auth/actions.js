import * as types from './actionTypes';
import Auth from '../../Services/Auth';

const signin = signin => ({
    type: types.AUTH_SIGN_IN,
    signin,
});

const verify = verifyCode => ({
    type: types.AUTH_VERIFY_CODE,
    verifyCode,
});

const addOnboard = onboard => ({
    type: types.AUTH_ONBOARD_DATA,
    onboard,
});

const setLoading = loading => ({
    type: types.AUTH_LOADING,
    loading,
});

const addSignup = signup => ({
    type: types.AUTH_SIGNUP_DATA,
    signup,
});

const addCo6s = co6ById => ({
    type: types.AUTH_ADD_CO6S,
    co6ById,
});

const setAccessToken = access_token => ({
    type: types.AUTH_SET_ACCESS_TOKEN,
    access_token,
})

const getVerifyCode = code => dispatch => {
    dispatch(setLoading(true));
    Auth.verifyCode(code)
        .then( response => {
            dispatch(setLoading(false));
            if(response) {
                dispatch(addOnboard(response));
            }
        })
        .catch( error => {
            dispatch(setLoading(false));
        })
}

const getCo6s = token => dispatch => {
    //dispatch(setLoading(true));
    Auth.getCo6s(token)
        .then( response => {
            console.log(response)
            //dispatch(setLoading(false));
            if(!response.error) {
                dispatch(addCo6s(response.byId));
                console.log(response.byId)
            }
        })
        .catch( error => {
            //dispatch(setLoading(false));
            console.log(error)
        })
}

const handleSignin = form => dispatch => {
    Auth.login(form)
        .then( response => {
            if(response && !response.error) {
                dispatch(signin(response));
                const o = {
                    error: false,
                    data: response.onboard
                }
                console.log(o, response.user)
                dispatch(addOnboard(o));
            } else {
                dispatch(signin({error: true, message: 'Invalid email or password'}));
            }
        } )
        .catch( error => {
            dispatch(signin({error: true, message: 'Invalid email or password'}));
            console.log(error)
        } )
}
handleSignup = data => dispatch => {
    dispatch(setLoading(true));
    Auth.signup(data)
        .then( response => {
            console.log(response)
            dispatch(setLoading(false));
            dispatch(addSignup(response));
        })
        .catch( error => {
            dispatch(setLoading(false));
        })
}

handleLogout = () => dispatch => {
    setDefault(dispatch);
}

const setDefault = dispatch => {
    dispatch(signin({}));
    dispatch(verify(""));
    dispatch(setLoading(false));
    dispatch(addSignup({}));
    dispatch(addOnboard({}));
    dispatch(addCo6s({}));
    dispatch(setAccessToken(""));
} 

const authActions = {
    handleSignin,
    signin,
    verify,
    addOnboard,
    addSignup,
    getVerifyCode,
    handleSignup,
    setLoading,
    setDefault,
    handleLogout,
    getCo6s,
    setAccessToken,
    addCo6s,
}
export default authActions;