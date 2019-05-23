import axios from 'axios';
import URL from './../Config/URL';

/*const headers = {
    Accept: 'application/json',
}
const post = (url, data) => {
    return axios.post(URL.BASE + url, data, {headers: headers});
}

const get = url => {
    return axios.get(URL.BASE + url, {headers: headers});
} */

const headers = {
    "Content-Type": 'application/json',
    "Accept": 'application/json',
}
// x-www-form-urlencoded

const get = (url, options={}) => {
    if(options) {
        options = {...headers, ...options}
    }
    console.log(URL.BASE + url)
    return axios.get(URL.BASE + url, {headers: options});
}

const post = (url, data, options={}) => {
    optionsim = {...headers, ...options}
    console.log(URL.BASE + url)
    return axios.post(URL.BASE + url, data, {headers: optionsim});
} 

const authPost = (url, data, token) => {
    const authToken = {Authorization: 'Bearer ' + token};
    const options = {...headers, ...authToken}
    console.log(URL.BASE + url)
    return axios.post(URL.BASE + url, data, {headers: options});
}

const authGet = (url, token) => {
    const authToken = {Authorization: 'Bearer ' + token};
    const options = {...headers, ...authToken}
    console.log(URL.BASE + url)
    return axios.get(URL.BASE + url, {headers: options});
}

const Server = {
    post,
    get,
    authGet,
    authPost,
}

export default Server;