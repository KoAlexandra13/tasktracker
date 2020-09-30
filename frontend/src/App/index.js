import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Home';
import CreateNewBoard from './CreateNewBoard';
import CreateNewTeam from './CreateNewTeam';
import Header from './Header';
import Login from './Login';
import SignUp from './SignUp'
import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from '../reducers/root';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Store
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

class App extends React.Component{

    render(){
        return (
          <Provider store={store}>
            <Router>
              <div>
                <Switch>
                  <Route path="/createnewboard">
                    <Header />
                    <CreateNewBoard />
                  </Route>
                  <Route path="/createnewteam">
                    <Header />
                    <CreateNewTeam />
                  </Route>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/signup">
                    <SignUp />
                  </Route>
                  <Route path="/">
                    <Header />
                    <Home />
                  </Route>
                </Switch>
              </div>
            </Router>
          </Provider>
        )};
}

export default App;