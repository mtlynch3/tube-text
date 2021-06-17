import * as type from '../actions/actionTypes';


const userAuth = (state = {}, action) =>{
    switch(action.type){
        case (type.GET_USER):
            return (action.payload);
        case (type.REMOVE_USER):
            return {};
        default:
            return state; 
    }
}

export default userAuth;