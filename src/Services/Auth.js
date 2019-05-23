import Constants from "../Config/Constants";
import BursarStorage from './BursarStorage';
import Server from './Server';
import URL from './../Config/URL';
import co6s from './../Config/co6s';

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
const requestToken = form => {
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
        .catch( error => console.log(error) )
};

const signin = token => {
    return Server.authGet(URL.SIGNIN, token)
            .then( (login => login.data))
            .catch( error => error);
}

const getMemberOrgs = token => {
    return Server.authGet('api/get-member-orgs', token)
        .then( resp => resp.data )
        .catch( error => error )
}

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
    return Server.post(URL.SIGNUP, data)
        .then( resp => resp.data )
        .catch( error => console.log(error));
}

const getMemberUser = form => {
    return Server.post('api/get-member-user', form)
        .then( resp => resp.data )
}

const createCo6 = form => {
    return Server.post('api/create-co6', form)
        .then( resp => resp.data )
}

const getCo6s = token => {
    return Server.authGet('api/get-co6s', token)
        .then( resp => resp.data )
}

const verifyCode = code => {
    return Server.get(URL.VERIFY_CODE + "?uniqueCode=" + code)
        .then( response => response.data )
        .catch( error => console.log(error) )
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
    verifyCode,
    getMemberUser,
    createCo6,
    getCo6s,
    requestToken,
    signin,
    getMemberOrgs,
}