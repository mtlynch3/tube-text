import * as type from '../actions/actionTypes';

//THe user's sessions are stored in an array
const userSessions = (state = [], action) =>{
    switch(action.type){
        case (type.FETCH_SESSIONS):
            return (action.payload);
        case (type.ADD_STUDY_SESSION): //we dont sort unlike our notes reducer
            return [...state, action.payload];
        case (type.DELETE_STUDY_SESSION):
            return state.filter((session) => session.id!==action.payload);
        default:
            return state; 
    }
}

export default userSessions;