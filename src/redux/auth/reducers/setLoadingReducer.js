import Utility from "../../../Services/Utility";

/**
 * Reducer function to update the signin key on the store
 */

 const setLoadingReducer = (loading, action) => {
     if(!Utility.isset(action.loading)) {
         return loading;
     }

     return action.loading;
 }; 

 export default setLoadingReducer;