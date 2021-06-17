import * as types from './actionTypes';
// import { bindActionCreators } from 'redux';
import axios from 'axios';

/****************************** ACTION CREATOR ***************************/
//AUTH ---------
const getUser = user => {
    return {
        type: types.GET_USER,
        payload: user
    }
}
const removeUser = () => {
    return {
        type: types.REMOVE_USER
    }
}

//NOTES ---------
const fetchNotes = (all_notes) => {
    return {
        type: types.FETCH_NOTES,
        payload: all_notes
    }
}

const deleteNote = (note_id) => {
    return {
        type: types.DELETE_NOTE,
        payload: note_id
    }
}

const addNote = (note) => {
    return {
        type: types.ADD_NOTE,
        payload: note
    }
}

const editNote = (note) => {
    return {
        type: types.EDIT_NOTE,
        payload: note
    }
}

//SESSIONS ---------
const fetchSessions = (all_sessions) => {
    return{
        type: types.FETCH_SESSIONS,
        payload: all_sessions
    }
}

const addStudySession = (study_session) => {
    return {
        type: types.ADD_STUDY_SESSION,
        payload: study_session
    }
}

const currentStudySession = (study_session) => {
    return {
        type: types.CURRENT_STUDY_SESSION,
        payload: study_session
    }
}

const fetchCurrentVideo = (videoUrl) => {
    return {
        type: types.CURRENT_VIDEO,
        payload: videoUrl
    }
}

const deleteStudySession = (session) => {
    return {
        type: types.DELETE_STUDY_SESSION,
        payload: session,
    }
}
//-----------------------------------------------------------------------------

//******************************** THUNKS *************************************
// For All thunks we first modify/access the databse and then update the front end
// with a dispatch 

//SESSIONS ---------

/**This function takes @id, which is the id of the individual user that is logged on
 * and then it requests from the backend the sessions the user has.
 */
export const fetchSessionsThunk = id => async dispatch => {
    try {
        let res = await axios.get(`/api/studysessions/users/${id}`);
        let sessions = [].concat(res.data);
        dispatch(fetchSessions(sessions));
        return res.data;
    } catch (err) {
        console.log(err);
    }
    


    // axios.get(`/api/studysessions/users/${id}`)
    // .then((response) =>{
    //     dispatch(fetchSessions(response.data));
    // })
    // .catch((error)=>{
    //     console.log(error);
    // });    
}

/**This function takes @study_session, which is the study session object the user is
 * creating and it posts this session into our data base
 */
export const addStudySessionThunk = study_session => async dispatch => {
    try {
        let res = await axios.post('/api/studysessions/add', study_session);
        dispatch(addStudySession(res.data));
        return res.data;
    } catch(error) {
        console.log(error);
    }

}

/**This function takes @study_session, as the session the user hover overs and clicks
 * and then it ensure the current study session state is updated with this object
 */
export const currStudySessionThunk = study_session => dispatch => {
    //we can do this in one line, instead of storing in a variable I believe
    let resolvedActionObject = currentStudySession(study_session);
    dispatch(resolvedActionObject);
}

/**This function takes @session, which is the entire session and it removes it from
 * our table. Becauase one session has many notes it must also delete the notes.
 * To do this we added special property called {onDelete: 'cascade', hooks:true} that 
 * delete notes associated to a session autmatically. ^this snppet is in server/database/models/index,js
*/
export const deleteStudySessionThunk = session => async dispatch => {
    try {
        await axios.delete(`/api/studysessions/delete/${session.id}`);
        dispatch(deleteStudySession(session.id));
    } catch(error) {
        console.error(error);
    }

    // (axios.delete(`/api/studysessions/delete/${session.id}`))
    // .then(() => dispatch(deleteStudySession(session.id)))
    // .catch((error) => console.log(error));
}

//NOTES ---------

/**This function takes @stud_session_id, which is the id of the study session
 * and it requests the notes associated with this study session (used in refreshing
 * the page, in order to collect info again)
 */
export const fetchNotesThunk = stud_sess_id => async dispatch => {
    try {
        let res = await axios.get(`/api/notes/studysessions/${stud_sess_id}`);
        //sort data in ascending order
        const notes = [].concat(res.data).sort((a,b) => a.timestamp - b.timestamp);
        dispatch(fetchNotes(notes));
    } catch(error) {
        console.error(error);
    }


}

/**This function takes @stud_session_id, which is the id of the study session
 * and it requests the video associated with this study session (used in refreshing
 * the page, in order to collect info again)
 */
export const fetchCurrentVideoThunk = (stud_sess_id) => (dispatch) => {
    axios.get(`/api/studysessions/${stud_sess_id}`)
    .then(response => dispatch(fetchCurrentVideo(response.data.videoUrl)))
    .catch(error => console.error(error));
}

//Tony and Billie's comments - in the UI we need to make sure user input is valid before we allow it to go to backend
/**This function takes @note, which is the note the user created
 * and adds it to the list of notes that exists fo that individual study session
 */
export const addNotesThunk = note => async dispatch => {
    try {
        let res = await axios.post('/api/notes/add', note);
        dispatch(addNote(res.data));
        return res.data;
    } catch(error) {
        console.error(error);
    }

}

/**This function takes @note_id, which is the note id the user wants to delete
 * and it deletes it from the table in the database
 */
export const deleteNoteThunk = (note_id) => (dispatch) => {
    axios.delete(`/api/notes/delete/${note_id}`)
    .then(() => dispatch(deleteNote(note_id)))
    .catch(error => console.error(error));
}

/**This function takes @note, which is the note the user created
 * and edits it in the list of notes that exists for that individual study session
 */
export const editNoteThunk = (note) => (dispatch) => {
    axios.put(`/api/notes/edit/${note.id}`, note)
    .then(() => dispatch(editNote(note)))
    .catch(error => console.log(error));
    
}

//AUTH ----------

export const me = () => async dispatch => {
    try {
        const res = await axios.get("/auth/me", { withCredentials: true});
        dispatch(getUser(res.data || {}));
    }
    catch(err) {
        console.error(err);
    }
};

//should put user ID stuff here
export const auth = (username, password, method, history) => async dispatch => {
    let res;
    try {
        res = await axios.post(`/auth/${method}`, { username, password }, { withCredentials: true });
        history.push(`/study_sessions`);
    } catch (authError) {
        return dispatch(getUser({ error: authError}));
    }

    try {
        dispatch(getUser(res.data));
    } catch (dispatchOrHistoryErr) {
        console.error(dispatchOrHistoryErr);
    }
};

export const logout = () => async dispatch => {
    try {
        await axios.delete("/auth/logout", { withCredentials: true });
        dispatch(removeUser());
    } catch (err) {
        console.error(err);
    }
};

