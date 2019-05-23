import Utility from "../../../Services/Utility";

/**
 * Reducer function to update the signin key on the store
 */

 const setCo6sReducer = (co6ById, action) => {
     if(!Utility.isset(action.co6ById)) {
         return co6ById;
     }

     return action.co6ById;
 };

 export default setCo6sReducer;