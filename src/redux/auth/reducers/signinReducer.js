import Utility from "../../../Services/Utility";

/**
 * Reducer function to update the signin key on the store
 */

 const signinReducer = (signin, action) => {
     if(!Utility.isset(action.signin)) {
         return signin;
     }

     return action.signin;
 };

 export default signinReducer;