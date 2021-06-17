import { Component } from "react";
import { connect } from "react-redux";
import { auth } from '../../store/actions/actionCreatorsThunks';
import  AuthFormView from "../views/AuthFormView";

// Smart container
class AuthFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.loginOrSignup(this.state.username, this.state.password, event.target.name, this.props.history);
  }

  render() {
    return (
      <AuthFormView
        name={this.props.name}
        displayName={this.props.displayName}
        error={this.props.error}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        isLoggedIn={this.props.isLoggedIn}
        userName={this.props.userName}
      />
    );
  }
};

// Map state to props;
const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.userAuth.error,
    isLoggedIn: !!state.userAuth.id,
    userName: state.userAuth.username
  };
};

// Map state to props;
const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Signup",
    error: state.userAuth.error,
    isLoggedIn: !!state.userAuth.id,
    userName: state.userAuth.username
  };
};

// Map dispatch to props;
const mapDispatch = dispatch => {
  return {
    loginOrSignup: (username, password, formName, history) => dispatch(auth(username, password, formName, history))
  }
};

export const Login = connect(mapLogin, mapDispatch)(AuthFormContainer);
export const Signup = connect(mapSignup, mapDispatch)(AuthFormContainer);