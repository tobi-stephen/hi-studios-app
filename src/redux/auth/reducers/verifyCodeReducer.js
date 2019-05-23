import Utility from "../../../Services/Utility";

/**
 * Reducer function to update the signin key on the store
 */

 const verifyCodeReducer = (verifyCode, action) => {
     if(!Utility.isset(action.verifyCode)) {
         return verifyCode;
     }

     return action.verifyCode;
 }; 

 export default verifyCodeReducer;