import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Responsive from 'react-responsive';
import Badge from '@material-ui/core/Badge';
import DescriptionIcon from '@material-ui/icons/Description';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { makeStyles } from '@material-ui/core/styles';

import ReactPlayer from 'react-player';


const useStyles = makeStyles( () => ({
  root:{    
    color: 'white',
    width: '100vw',
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
  iconButton:{
    color: '#4e4f73',
  },
  notesContainer:{
    minHeight: 650, 
    minWidth: 600,
    backgroundColor: '#f0f0f5', 
    border: '1px solid white',
  },
  mainGrid: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    margin: '5px 0px 0px',
  },
  newNoteForm:{
    width: '650px',
    textAlign: 'center',
  },
  noteTextArea:{
    width: 520,
    backgroundColor: 'white',
    margin: '15px auto',
    padding: '2px 5px 5px',
    borderRadius: '5px',
    display: 'flex',
    flexFlow: 'column nowrap',
  },
  individualNote:{
    borderRadius: '4px',
    width: '575px',
    backgroundColor: '#a3a3c2',
    color: 'black',
  },
  timestampButton:{
    float: 'left',
  }

}));


function convertToHumanReadable(timestamp){
    var sec_num = parseInt(timestamp, 10); 
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
   
    return hours+':'+minutes+':'+seconds;
}

//Responsive functionality
const Desktop = props => <Responsive {...props} minWidth={1275} />;

const SingleSessionView = (props) => {
    const { allNotes, handleChange, handleAddNote, deleteNote, videoUrl, thePlayer, videoSeek, onClickEdit, 
            mustEdit, handleEditSubmit, onClickEditCancel 
          } = props;

    const classes = useStyles();

    return (
      <div className={classes.root}>
        <AppBar position="static" elevation={0} className={classes.customizeAppBar}>
          <Toolbar>
            <Link className={classes.title} to={'/study_sessions'}>
              <Typography variant="h6" color = "inherit" style={{fontType: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '35px', color: '#CDDC39'}}>
                TubeText
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>

        <Fragment>
          {/* Responsive Desktop View */}
          <Desktop>
            {/* main grid has two items, player container and notes container*/}
            <Grid container className={classes.mainGrid}
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
            > 
              {/* left side of main grid (player container)*/}
              <Grid container item xs={6}
                    direction="column"
                    justify="space-around"
                    alignItems="center"   
              >
                <Grid item>
                  <ReactPlayer
                    ref={thePlayer}
                    url={videoUrl}
                    controls={true}
                    onSeek={videoSeek}
                  />           
                </Grid>

                <Grid item className={classes.newNoteForm}>
                  <form onSubmit={(e) => handleAddNote(e)}>
                    <div className={classes.noteTextArea}>
                      <TextField
                        margin="dense"
                        style={{ margin: 8 }}
                        placeholder="Note"
                        multiline
                        rows={5}
                        name="newNoteContent"
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
            
                    <Button variant="contained" color="primary" type="submit">
                      Add Note
                    </Button>
                    <br/>
                    <Badge style={{margin: '25px'}} badgeContent={allNotes.length} color="error">
                      <DescriptionIcon />
                    </Badge>
                  </form>
                </Grid> 
              </Grid> {/** end player container */}
              
              {/* right side of main grid (notes container) */}
              <Grid container item xs={6} 
                    direction="column"
                    justify="space-between" 
                    alignItems="center"
              >
                <Paper className={classes.notesContainer} >
                  <List>
                    { allNotes.map(note => {
                      return (
                        <ListItem key={note.id} alignItems="center">
                          <Grid item>
                            <div className={classes.individualNote}>
                              {/** note buttons */}
                              <div style={{overflow: 'hidden',}}>
                                <div style={{float: 'left', position: 'relative',}}>
                                  <IconButton 
                                        aria-label="edit" 
                                        className={classes.iconButton} 
                                        onClick={() => onClickEdit(note.id, note.content)} 
                                        id={note.id}
                                    >
                                      <EditIcon />
                                    </IconButton>
                                </div>
                                
                                <div className={classes.timestampButton}>
                                    <Button variant="contained" color="primary" 
                                            onClick = {() => videoSeek(note.timestamp)} 
                                            className="timestamp-button" 
                                            style={{margin: '8px'}}
                                    >
                                      {convertToHumanReadable(note.timestamp)}
                                    </Button>
                                </div>
                                
                                <div style={{float: 'right', }}>
                                  <IconButton aria-label="delete" 
                                        className={classes.iconButton} 
                                        onClick={() => deleteNote(note.id)} 
                                        id={note.id}
                                  >
                                    <DeleteIcon />
                                  </IconButton>                           
                                </div>
                              </div> {/** end note buttons */}
                                    
                              <div style={{padding: '0px 20px 10px 20px',}}>
                                { (mustEdit === note.id)
                                  ? <form style={{textAlign: 'center'}} onSubmit={(e) => handleEditSubmit(e, note.timestamp)}>
                                      <div className={classes.noteTextArea}>
                                        <TextField
                                          style={{ margin: 8 }}          
                                          label="Note"
                                          placeholder="Enter note here"
                                          multiline
                                          rows={5}
                                          name="editNoteContent"
                                          onChange={(e) => handleChange(e)}
                                          defaultValue={note.content}
                                        />
                                      </div>
                                      
                                      <Button variant="contained" color="primary" type="submit" style={{margin: '10px'}}>Submit</Button>
                                      <Button variant="contained" color="primary" onClick={() => onClickEditCancel(note.content)}>Cancel</Button>
                                    </form>

                                  : <InputBase
                                      value={note.content}
                                      style={{
                                        width: 535, 
                                        overflow: 'auto', 
                                        backgroundColor: 'white',
                                        margin: 'auto', 
                                        padding: '10px', 
                                        borderRadius: '5px'
                                      }}
                                      readOnly={true}
                                      inputProps={{
                                        'aria-label': 'naked'
                                      }}
                                    />
                                }
                              </div>
                            </div>
                          </Grid>
                        </ListItem>
                      ); //end return
                      }) /* end of .map function */ 
                    } 
                  </List>
                </Paper>
                <br/>
              </Grid> {/** end notes container */}

            </Grid> {/** end main container */}
          </Desktop>
        </Fragment>
      </div>
    )
}

export default SingleSessionView;