import * as types from './actionTypes';
import Auth from '../../Services/Auth';

const signin = signin => ({
    type: types.AUTH_SIGN_IN,
    signin,
});

const handleSignin = form => dispatch => {
    Auth.login(form)
        .then( response => {
            if(response && !response.error) {
                dispatch(signin(response));
            } else {
                dispatch(signin({error: true, message: 'Invalid email or password'}));
            }
        } )
        .catch( error => {
            dispatch(signin({error: true, message: 'Invalid email or password'}));
            console.log(error)
        } )
}

const authActions = {
    handleSignin,
    signin,
}
export default authActions;