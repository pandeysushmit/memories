import {AUTH,LOGOUT} from '../constants/actionTypes';
// import { googleLogout } from '@react-oauth/google';
const authReducer=(state={authData:null},action)=>{
    switch(action.type){
        case AUTH:
            // console.log(action?.data);
            localStorage.setItem('profile',JSON.stringify({...action?.data}))
            return {...state,authData:action?.data};
        case LOGOUT:
            // googleLogout();
            localStorage.clear();
            return{...state,authData:null}
        default:
            return state;
    }
};
export default authReducer;