import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      textAlign: 'left',
    },
    customizeAppBar:{
        backgroundColor: '#11153e',
        shadows: ['none'],
    },
    boxStyle:{
        backgroundColor: '#a3a3c2',
        width: '75%',
        margin: 'auto',
        spacing: 3,
        alignItems: 'center'
    },

  }));

  const style = {
    textDecoration: 'none'
};


const HomePageView = () => {
    
    const classes = useStyles();
    return (
    <div>
        <div className={classes.root}>
            <AppBar position="static" className = {classes.customizeAppBar}>
            <Toolbar className = {classes.customizeToolBar}>
                <Typography variant="h6" className={classes.title} color = "inherit" style={{fontType: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '35px', color: '#CDDC39'}}>
                    TubeText
                </Typography>
                
                <Link style={style} to={'/signup'} >
                <Button variant="contained" color="primary" style={{margin: '10px'}}>
                    Sign Up
                </Button>
                </Link>

                <Link style={style} to={'/login'} >
                <Button variant="contained" color="primary">
                    Log in
                </Button>
                </Link>

            </Toolbar>
            </AppBar>
        </div>
        <Grid container direction="column" className={classes.boxStyle} >
            <h1>TubeText</h1>
            <h3>Take timestamped notes on any web video</h3>
        </Grid>
         
    </div>

    
    );
    
}




export default HomePageView;
