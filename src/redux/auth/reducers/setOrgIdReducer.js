import Utility from "../../../Services/Utility";

/**
 * Reducer function to update the signin key on the store
 */

 const setOrgIdReducer = (organization_id, action) => {
     if(!Utility.isset(action.organization_id)) {
         return organization_id;
     }

     return action.organization_id;
 }; 

 export default setOrgIdReducer;