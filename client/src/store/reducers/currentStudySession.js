import * as type from '../actions/actionTypes';

// let initialState = {
//     currentStudySession: {id : 0}
// }

//the current study session is one object, based on what the user clicked
const currentStudySession = (state = {}, action) => {
    switch (action.type) {
        case type.CURRENT_STUDY_SESSION:
            return action.payload;               
        default:
            return state;
    }
}

export default currentStudySession;