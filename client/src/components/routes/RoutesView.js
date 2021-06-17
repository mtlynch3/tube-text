import AllSessionsContainer from '../containers/AllSessionsContainer';
import SingleSessionContainer from '../containers/SingleSessionContainer';
import NewSessionContainer from '../containers/NewSessionContainer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login, Signup } from '../containers/AuthFormContainer';

//import PdfContainer from '../containers/pdfContainer';
import HomePageContainer from '../containers/HomePageContainer';


const RoutesView = (props) => {
  const { isLoggedIn } = props;
  const AllSessionsComponent = () => <AllSessionsContainer/>
  const HomePageComponent = () => <HomePageContainer/>
  const NewSessionComponent = () => <NewSessionContainer/>
  const SingleSessionComponent = () => <SingleSessionContainer />


  return (
  <Router>
    <Switch>
      {/* Routes placed within this section are available to all visitors */}
        <Route exact path="/" render={HomePageComponent}/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />

      {isLoggedIn && (
        <Switch>
                <Route exact path="/study_sessions" render={AllSessionsComponent}/>
                <Route exact path ="/study_sessions/add_session" render={NewSessionComponent}/>
                <Route exact path="/study_sessions/:sessionId" render={SingleSessionComponent}/>

                {/* Be sure to put add_session before the :sessionId becasue :sessionId is a wildcard
                and basically anything that has study_sessions/ ... will lead to the single session component
                instead of the actual path wanted */}
        </Switch>
      )}

      {/* Display Login component as a fallback */}
      <Route component={Login}/>

    </Switch>
  </Router>
  );
}



export default RoutesView;