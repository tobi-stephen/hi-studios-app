import Constants from "../Config/Constants";
import BursarStorage from './BursarStorage';
import Server from './Server';
import URL from './../Config/URL';

/*
 There are three cases to consider

 1. Newly installed app without any data in storage: 
 2. User already seen the intro screens
 3. User is already logged in and set that they remain logged in

 BURSAR = {
    user: {

    },

 }

 BURSAR_INTRO_VIEW: 1

*/

const login = form => {
    console.log(form)
    const data = {
        username: form.username,
        password: form.password,
        grant_type: Constants.GRANT_TYPE,
        client_id: Constants.CLIENT_ID,
        client_secret: Constants.CLIENT_SECRET,
    }
    return Server.post(URL.REQUEST_TOKEN, data)
        .then ( resp => resp.data )
        .then( token => {
            return Server.authGet(URL.LOGIN, token.access_token)
                .then( (login => login.data))
                .catch( error => error)
        })
        .catch( error => console.log(error));
}

const signup = data => {
    return Server.get(URL.SIGNUP, data)
        .then( resp => console.log(resp))
        .catch( error => console.log(error));
}

const setIntroViewed = async () => {
    try {
        await LStorage.store(Constants.BURSAR_INTRO_VIEWED, Constants.BURSAR_INTRO);
    } catch (error) {
        return false;
    }
};

const introViewed = async () => {
    try {
        const introViewed = 0; // await BursarStorage.retrieve(Constants.BURSAR_INTRO_VIEWED);
        if(introViewed === Constants.BURSAR_INTRO) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export default Auth = {
    setIntroViewed,
    introViewed,
    login,
    signup,
}