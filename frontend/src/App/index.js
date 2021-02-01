import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Home';
import CreateNewBoard from './CreateNewBoard';
import SignUp from './SignUp'
import Auth from '../components/Auth/index'
import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from '../reducers/root';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Account from './Account';
import VerifyEmail from './VerifyEmail'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

class App extends React.Component{
    render(){
        return (
          <Provider store={store}>
            <Router>
              <Switch>
                <Route path='/signup' component={SignUp}/>
                <Route path='/email-activate' component={VerifyEmail}/>
                <Route path='/'>
                  <Auth>
                    <Switch>
                      <Route exact path='/' component={Home}/>
                      <Route path='/createnewboard' component={CreateNewBoard}/>
                      {/*<Route path='/createnewteam' component={CreateNewTeam}/>*/}
                      <Route path='/account' component={Account}/>
                    </Switch>
                  </Auth>
                </Route>
              </Switch>
            </Router>
          </Provider>
        )};
}

export default App;