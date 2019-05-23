import Utility from "../../../Services/Utility";

/**
 * Reducer function to update the signin key on the store
 */

 const addSignupReducer = (signup, action) => {
     if(!Utility.isset(action.signup)) {
         return signup;
     }

     return action.signup;
 }; 

 export default addSignupReducer;