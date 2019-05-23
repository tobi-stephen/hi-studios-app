import Utility from "../../../Services/Utility";

/**
 * Reducer function to update the signin key on the store
 */

 const addOnboardReducer = (onboard, action) => {
     if(!Utility.isset(action.onboard)) {
         return onboard;
     }

     return action.onboard;
 }; 

 export default addOnboardReducer;