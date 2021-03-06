import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {initAxios} from '../api/index';
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
import Board from './Board';
import ForgotPassword from './ForgotPassword';
import PageUnderConstruction from './PageUnderConstruction';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

initAxios();

class App extends React.Component{
    render(){
        return (
          <Provider store={store}>
            <Router>
              <Switch>
                <Route path='/signup' component={SignUp}/>
                <Route path='/email-activate' component={VerifyEmail}/>
                <Route path='/forgotpassword' component={PageUnderConstruction}/>
                <Route path='/'>
                  <Auth>
                    <Switch>
                      <Route exact path='/' component={Home}/>
                      <Route path='/createnewboard' component={CreateNewBoard}/>
                      <Route path='/account' component={Account}/>
                      <Route path='/board' component={Board}/>
                      <Route path='/termsAndConditions' component={PageUnderConstruction}/>
                      <Route path='/about' component={PageUnderConstruction}/>
                    </Switch>
                  </Auth>
                </Route>
              </Switch>
            </Router>
          </Provider>
        )};
}

export default App;