import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles( () => ({
  formContainer:{  
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none'
  }, 
  customizeAppBar:{
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle:{
    backgroundColor:'#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
  
}));

const NewSessionView = (props) => {
  const {handleChange, handleSubmit } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.customizeAppBar}>
        <Toolbar>
          <Link className={classes.title} to={'/study_sessions'}>
            <Typography style={{fontFamily: 'Courier, sans-serif', fontSize: '35px', color: '#CDDC39'}}>
              TubeText
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <br/>
      <div className={classes.formContainer}>
        <div className={classes.formTitle}>
          <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
            New Session
          </Typography>
        </div>
        <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
          <label style= {{color:'#11153e', fontWeight: 'bold'}}>Video URL: </label>
          <input type="text" name="videoUrl" onChange ={(e) => handleChange(e)} />
          <br/>
          <br/>

          <label style={{color:'#11153e', fontWeight: 'bold'}}>Study Session Name: </label>
          <input type="text" name="name" onChange={(e) => handleChange(e)} />
          <br/>
          <br/>

          <label style={{color:'#11153e', fontWeight: 'bold'}}>Study Session Description: </label>
          <input type="text" name="description" onChange={(e) => handleChange(e)} />
          <br/>
          <br/>

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          <br/>
          <br/>
        </form>
        </div>
      </div>
    
  )
}

export default NewSessionView;