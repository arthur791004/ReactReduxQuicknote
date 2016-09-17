import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authUser, setRoutePath } from '../../shares/actions';
import User from '../../shares/models/User';

export default function(WrappedComponent) {
  class Auth extends Component {
    componentWillMount() {
      const { config } = this.props;
      const { authUser, setRoutePath } = this.props;

      if (!config.hostname) {
        setRoutePath('/config');
      } else {
        new User()
          .checkAuth(config)
          .then((authedUser) => {
            authUser(authedUser);
          })
          .catch((error) => {
            setRoutePath('/login');
          });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Auth);

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
}
