/**
 * These imports are needed in order to have our "single-source-of-truth" set up,
 * middleware set up (including thunks for asynchronous calls), loggings for the 
 * actions being called etc...
 */
 import { combineReducers, applyMiddleware, createStore } from "redux";
 import { createLogger } from "redux-logger";
 import thunkMiddleware from "redux-thunk";
 import { composeWithDevTools } from "redux-devtools-extension";
 
 /**
  * Need our reducers to combine into a single root reducer
  */
 import userSessions from './reducers/userSessions';
 import userAuth from './reducers/userAuth';
 import allNotes from './reducers/allNotes';
 import currentStudySession from './reducers/currentStudySession';
 import currentVideo from './reducers/currentVideo';
 
 /**
  * Creating rootReducer that will have all the functionality of our SPA
  * Creating a logger to display the actions taken adn changes to state (pre, ation, post)
  * Creating a middleware to handle async calls
  * Creating the store that houses our state (single-source-of-truth)
  */
 const rootReducer = combineReducers({userSessions, allNotes, currentStudySession, currentVideo, userAuth});
 const logger = createLogger({ collapsed: true });
 const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, logger));
 const store = createStore(rootReducer, middleware);
 
 export default store;