import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import Welcome from '../components/Welcome';
import getCode from '../helpers/auth_code';
import '../assets/style/App.css';

function App() {
  useEffect(() => {
    getCode();
  }, [getCode]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div className="app-progress"><CircularProgress /></div>
        </Route>
        <Route path="/login">
          <Welcome />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
