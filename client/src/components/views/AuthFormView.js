import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  },
  formStyle: {
    textAlign: 'center',
    backgroundColor: 'pink',
    width: "30%",
    margin: "30px auto 0", 
    
  },
  customizeAppBar:{
      backgroundColor: '#11153e',
      shadows: ['none'],   
  },

}));


const AuthFormView = props => {
  const { name, handleSubmit, error, handleChange, isLoggedIn, displayName, userName } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className = {classes.customizeAppBar}>
        <Toolbar>
          <Link className={classes.title} to={'/'}>
            <Typography variant="h6" color = "inherit" style={{fontType: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '35px', color: '#CDDC39'}}>
              TubeText
            </Typography>
          </Link>

          <Link style={{textDecoration: 'none'}} to={'/signup'}>
            <Button variant="contained" color="primary" style={{margin: '10px'}}>
              Sign Up
            </Button>
          </Link>

          <Link style={{textDecoration: 'none'}} to={'/login'} >
            <Button variant="contained" color="primary">
              Log in
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      
      <Grid container direction="column" justify="space-evenly" alignItems="center" className={classes.formStyle} >
        <div style={{padding: "10px 0"}}>
          {isLoggedIn ? `Current user: ${userName}` : "No user logged in"}
        </div>
        <form onSubmit={handleSubmit} name={name}>
          <div style={{padding: "0 0 10px"}}>{displayName}</div>

          <label className="username" style= {{color:'#11153e', fontWeight: 'bold'}}> Username: </label>
          <input type="text" name = "username" onChange ={handleChange} />
          <br/><br/>
          
          <label className="password" style= {{color:'#11153e', fontWeight: 'bold'}}> Password: </label>
          <input type="password" name = "password" onChange ={handleChange} />
          <br/><br/>
          
          <Button variant="contained" color="primary" type="submit">{displayName}</Button>
          <br/><br/>
          
          {error && error.response && <div style={{padding: "0 0 10px"}}> {error.response.data} </div>}
        </form>
      </Grid>
    </div>
  );
};

export default AuthFormView;