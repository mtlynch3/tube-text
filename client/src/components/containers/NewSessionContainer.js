import React, { Component } from 'react';
import NewSessionView from '../views/NewSessionView';
import { addStudySessionThunk } from '../../store/actions/actionCreatorsThunks';
// connect to the store
import { connect } from 'react-redux';
// need withRouter to push userID of the study session into history of SPA
import { withRouter, Redirect } from 'react-router-dom';
// in order to export two things
import { compose } from 'redux';

class NewSessionContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            videoUrl: "",
            name: "",
            description: "",
            redirect: false
        };
    }

    handleChange = event => {
        // name is directly associated with the key in the back end for a new study session
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        // creating the approprite object with the appropriate keys 
        // to push into my database 
        let study_sess = {
            videoUrl: this.state.videoUrl,
            name: this.state.name,
            description: this.state.description,
            userId: this.props.userId
        };
        this.props.addStudySessionThunk(study_sess);
        //this.props.history.push(`/study_sessions`);

        this.setState({videoUrl: "", name: "", description: "", redirect: true});
    }

    componentWillUnmount() {
        this.setState({redirect: false});
    }

    render() {
        if(this.state.redirect) {
            return (<Redirect to="/study_sessions"/>)
        } else {
            return (
                <NewSessionView 
                    handleChange = {this.handleChange} 
                    handleSubmit={this.handleSubmit}      
                />
            )
        }

    }
}

const mapState = (state) => {
    return({
        userSessions: state.userSessions,
        userId: state.userAuth.id
    })
}

const mapDispatch = (dispatch) => {
    return({
        addStudySessionThunk: (study_sess) => dispatch(addStudySessionThunk(study_sess)),
    })
}

export default compose(
    withRouter,
    connect(mapState, mapDispatch)
  )(NewSessionContainer);