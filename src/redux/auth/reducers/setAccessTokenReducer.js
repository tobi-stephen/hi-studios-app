import Utility from "../../../Services/Utility";

/**
 * Reducer function to update the signin key on the store
 */

 const setAccessTokenReducer = (access_token, action) => {
     if(!Utility.isset(action.access_token)) {
         return access_token;
     }

     return action.access_token;
 };

 export default setAccessTokenReducer;