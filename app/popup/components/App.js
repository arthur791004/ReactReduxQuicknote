import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { hashHistory, IndexRoute, Route, Router } from 'react-router';
import Quicknote from './Quicknote';
import AddQuicknote from './AddQuicknote';
import Config from './Config';
import Login from './Login';
import PageNotFound from './PageNotFound';
import RequireAuth from './RequireAuth';

export default class App extends Component {
  render() {
    return (
      <Router history={ hashHistory }>
        <Route path="/" component={ Quicknote }>
          <IndexRoute component={ RequireAuth(AddQuicknote) } />
          <Route path="config" component={ Config } />
          <Route path="login" component={ Login } />
          <Route path="*" component={ PageNotFound } />
        </Route>
      </Router>
    );
  }
}
