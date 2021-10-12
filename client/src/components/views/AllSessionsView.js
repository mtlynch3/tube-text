import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


const useStyles = makeStyles( () => ({
    root: {
      flexGrow: 1,
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
    card: {
        minWidth: 200,
        width: '100%',
        textAlign: 'center',
        backgroundColor:'#a3a3c2',
    },
    cardTitle: {
        fontSize: 20,
        color: '#11153e',
    },
    deleteButton:{
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: '#cddc39'
        },
    },
    viewButton:{
        "&:hover": {
            backgroundColor: '#cddc39'
        },
    },
    paperStyle:{
      minHeight: 900, 
      maxHeight:900, 
      minWidth: '100%', 
      maxWidth: '100%', 
      overflow: 'auto', 
      backgroundColor: 'white', 
      border: '1px solid white'
    },
}));

const style = {
    textDecoration: 'none'
};

const AllSessionsView = props => {
  const { sessions, currentStudySession, deleteStudySession, handleLogout } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.customizeAppBar}>
        <Toolbar>
          <Link className={classes.title} to={'/study_sessions'}>
            <Typography variant="h6" color="inherit" style={{fontType: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '35px', color: '#CDDC39'}}>
            TubeText
            </Typography>
          </Link>
        
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <br/>
      <Grid container direction="column" spacing={3} alignItems="center" >
        <Grid item>
          <Link style = { style } to={`/study_sessions/add_session`}>            
            <Button variant="contained" color="primary">
                New Study Session
            </Button>
          </Link>
        </Grid>

        <Grid item style={{minWidth: '70%'}}>
          <Paper className={classes.paperStyle}>
            <List className="List">
            {sessions.map( (session) => {
                return (
                <ListItem key={session.id} onClick={() => currentStudySession(session)} alignItems='center'>
                    <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                        {session.name}
                        </Typography>
                    
                        <Typography>
                        {session.description}
                        </Typography>
                    </CardContent>
                                    
                    <CardActions disableSpacing>
                        <Link style = { style } to={`/study_sessions/${session.id}`}>
                        <Button className = {classes.viewButton}>View Session</Button>
                        </Link>
                        <Button className = {classes.deleteButton} onClick = {() => deleteStudySession(session)}>Delete Session</Button>
                    </CardActions>
                    </Card>
                    <br/><br/>
                </ListItem>           
                )
            })}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default AllSessionsView;