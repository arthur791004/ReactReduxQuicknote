import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import { authUser, setRoutePath } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  onClick() {
    const { config, user } = this.props;
    const { authUser, setRoutePath } = this.props;
    const protocols = config.enableSSL ? 'https://' : 'http://';
    const interval = setInterval(() => {
      user
        .checkAuth()
        .then((authedUser) => {
          clearInterval(interval);
          authUser(authedUser);
          setRoutePath('/');
        });
    }, 1000);

    window.open(`${protocols}${config.hostname}:${config.port}`);
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
  user: PropTypes.object.isRequired,
  setRoutePath: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

function mapStateToProps(state) {
  return {
    config: state.config,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authUser: (authedUser) => dispatch(authUser(authedUser)),
    setRoutePath: (routePath) => dispatch(setRoutePath(routePath)),
  };
}
