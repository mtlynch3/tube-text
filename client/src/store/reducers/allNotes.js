import * as type from '../actions/actionTypes';

/**All notes will be stored in an array for an invidvidual session */
const allNotes = (state = [], action) => {
    switch (action.type) {
        case type.FETCH_NOTES:
            return action.payload;
        case type.ADD_NOTE: 
        //once a note is added, all notes remain in ascending order
            let temp = [...state, action.payload];
            temp.sort((a,b)=> a.timestamp - b.timestamp);
            return temp;
        case type.DELETE_NOTE:
            return state.filter((note) => note.id!==action.payload);
        case type.EDIT_NOTE:
            return state.map((note) => { //want to copy notes in the array as they are and update the edited one only
                if (note.id === action.payload.id) {
                    return {
                        ...note,
                        content: action.payload.content
                    }
                } 
                else return note;
            })
        default:
            return state;
    }
}

export default allNotes;