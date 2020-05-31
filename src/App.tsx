import React from 'react';
import logo from './logo.svg';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Info from './containers/Info';
import Top from './containers/Top';
import Login from './containers/Login';

import ResponsiveDrawer from './containers/ResponsiveDrawer';
import Notification from './containers/Notification';

function App() {

  return (
    <Router>
      <div className="App">
        <Notification />
        <ResponsiveDrawer>
          <Switch>
            <Route exact path="/" component={Top} />
            <Route path="/login" component={Login} />
            <Route path="/info" component={Info} />

          </Switch>
        </ResponsiveDrawer>
      </div >
    </Router >
  );
}

export default App;
