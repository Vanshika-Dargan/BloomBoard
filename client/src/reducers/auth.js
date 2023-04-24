import { AUTH , LOGOUT} from "../constants/actionTypes";
export default (state={authdata:null},action) => {
    switch(action.type)
    {
        case AUTH:
            console.log(action?.data)
           localStorage.setItem('profile',JSON.stringify({...action?.data}))
            return {...state,authdata:action?.data}
        case LOGOUT:
            localStorage.clear();
            return {...state,authdata:action?.data}
        default:
            return state;
    }
}