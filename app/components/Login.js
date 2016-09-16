import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import { authUser, setRoutePath } from '../actions';
import { getOrigin } from '../utils';
import User from '../models/User';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  onClick() {
    const { config } = this.props;
    const { authUser, setRoutePath } = this.props;
    const origin = getOrigin(config);
    const interval = setInterval(() => {
      new User()
        .checkAuth(config)
        .then((authedUser) => {
          clearInterval(interval);
          authUser(authedUser);
          setRoutePath('/');
        });
    }, 1000);

    window.open(origin);
  }

  render() {
    return (
      <div>
        <RaisedButton label="以 Mail2000 帳號登入" onClick={ this.onClick.bind(this) } />
      </div>
    );
  }
}

Login.propTypes = {
  config: PropTypes.object.isRequired,
  setRoutePath: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

function mapStateToProps(state) {
  return {
    config: state.config,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authUser: (authedUser) => dispatch(authUser(authedUser)),
    setRoutePath: (routePath) => dispatch(setRoutePath(routePath)),
  };
}
