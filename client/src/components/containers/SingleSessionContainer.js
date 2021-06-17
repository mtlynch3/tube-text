import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import SingleSessionView from '../views/SingleSessionView';

import { 
    fetchNotesThunk, 
    addNotesThunk, 
    deleteNoteThunk, 
    editNoteThunk, 
    fetchCurrentVideoThunk 
} from '../../store/actions/actionCreatorsThunks';


class SingleSessionContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            editNoteContent: "",
            newNoteContent: "",
            editId: null
        }
        this.thePlayer = React.createRef();
    }
    

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onClickEdit = (noteId, noteContent) => {
        this.setState({
            editId: noteId,
            editNoteContent: noteContent
        });
    }

    onClickEditCancel = noteContent => {
        this.setState({
            editId: null,
            editNoteContent: noteContent
        });
    };

    handleEditSubmit = (event, noteTimestamp) => {
        event.preventDefault();
        let note = {
            studySessionId: this.props.currStudySession.id,
            timestamp: noteTimestamp,
            content: this.state.editNoteContent,
            id: this.state.editId
        };
        this.setState({
            editId: null
        });
        this.props.editNoteThunk(note);
    };

    handleAddNote = event => {
        event.preventDefault();
        let note = {
            studySessionId: this.props.currStudySession.id,
            timestamp: this.thePlayer.current.getCurrentTime(),
            content: this.state.newNoteContent
        };
        this.props.addNotesThunk(note);
        event.target.reset(); //to empty the input box
        this.setState({newNoteContent: ""}); //set content blank so empty note works
    }

    videoSeek = desiredTime => {
        this.thePlayer.current.seekTo(desiredTime);
    }
    
    componentDidMount() {
        //use history to get the sessionID based on the route, and this way
        //on refresh we do not lose the notes

        //maybe refresh issue coming from here
        /**     
         * at processTicksAndRejections (internal/process/task_queues.js:97:5) {
                status: 404
            }
        * /study_sessions/[object%20Object] */
        //
        this.props.fetchNotesThunk(this.props.match.params.sessionId);
        this.props.fetchCurrentVideoThunk(this.props.match.params.sessionId);

        // this.props.fetchNotesThunk(this.props.currStudySession.id)
        // this.props.fetchCurrentVideoThunk(this.props.currStudySession.id)


    }

    render() {
        return(
            <div>
                <SingleSessionView 
                allNotes = {this.props.allNotes} 
                handleChange = {this.handleChange} 
                handleAddNote={this.handleAddNote}
                
                mustEdit = {this.state.editId}
                handleEditSubmit = {this.handleEditSubmit}
                onClickEdit={this.onClickEdit}
                onClickEditCancel={this.onClickEditCancel}
                
                deleteNote = {this.props.deleteNoteThunk}

                videoUrl = {this.props.currentVideo}
                videoSeek = {this.videoSeek}

                thePlayer = {this.thePlayer}
                />
            </div>
        )
    }
}

const mapState = (state) => {
    return({
        allNotes: state.allNotes,
        currStudySession: state.currentStudySession,
        currentVideo: state.currentVideo
    })
}

const mapDispatch = (dispatch) => {
    return({
        fetchNotesThunk: (stud_sess_id) => dispatch(fetchNotesThunk(stud_sess_id)),
        addNotesThunk: (note) => dispatch(addNotesThunk(note)),
        deleteNoteThunk: (note_id) => dispatch(deleteNoteThunk(note_id)),
        editNoteThunk: (note) => dispatch(editNoteThunk(note)),
        fetchCurrentVideoThunk: (stud_sess_id) => dispatch(fetchCurrentVideoThunk(stud_sess_id)),
    })
}

// export default connect(mapState, mapDispatch)(SingleSessionContainer);

export default compose(
    withRouter,
    connect(mapState, mapDispatch)
)(SingleSessionContainer);