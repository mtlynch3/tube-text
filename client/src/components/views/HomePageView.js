import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'

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
    },
    customizeAppBar:{
        backgroundColor: '#11153e',
        shadows: ['none'],
    },
    customizeToolBar:{
        // minHeight: 35,
        // height: 35,
    },
    customNavButton:{
        "&:hover": {
            backgroundColor: '#d24d4d'
        },
        minHeight: 25,
        height: 29,
        minWidth: 70,
        width: 70,
        color: 'white',
        fontSize: '11px',
        borderRadius: 100,
        textTransform: 'none',
    },
    boxStyle:{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'pink',
        width: "50%",
        margin: "auto",
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
        <Box className={classes.boxStyle}><h1>HELLO !!!!</h1></Box>
         
    </div>

    
    );
    
}




export default HomePageView;
