/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Welcome from './Welcome';
import Main from './Main';
import apiFn from '../api/api';
import actions from '../actions/index';
import getCode from '../helpers/auth_code';
import session from '../api/session';
import '../assets/style/App.css';

const { myData, refreshToken } = apiFn;
const { getCookie, setCookie } = session;
const { setCode } = actions;

function App({ code, setCode }) {
  const history = useHistory();

  useEffect(() => {
    getCode();
    const atCookie = getCookie('nav-at');
    if (atCookie) {
      myData(atCookie).then(response => {
        if (response.error) {
          const url = window.location.href;
          refreshToken(url).then(refreshResponse => {
            setCookie(refreshResponse, 'nav-at');
            setCode(refreshResponse);
          });
        } else {
          setCode(atCookie);
        }
      })
    } else {
      history.push('/login');
    }
  }, [setCode, history]);

  return (
    <div>
      <Switch>
        <Route exact path="/">
          { code ? <Main /> : <div className="app-progress"><CircularProgress /></div> }
        </Route>
        <Route path="/login">
          <Welcome />
        </Route>
      </Switch>
    </div>
  );
}

App.propTypes = {
  code: PropTypes.string,
  setCode: PropTypes.func.isRequired,
};

App.defaultProps = {
  code: null,
};

const mapStateToProps = ({ codeReducer: code }) => ({
  code,
});

const mapDispatchToProps = (dispatch) => ({
  setCode: (myCode) => dispatch(setCode(myCode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
