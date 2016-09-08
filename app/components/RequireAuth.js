import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authUser, setRoutePath } from '../actions';

export default function(WrappedComponent) {
  class Auth extends Component {
    componentWillMount() {
      const { config, user } = this.props;
      const { authUser, setRoutePath } = this.props;

      if (!config.hostname) {
        setRoutePath('/config');
      } else {
        user
          .checkAuth()
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
      user: state.user,
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      authUser: (authedUser) => dispatch(authUser(authedUser)),
      setRoutePath: (routePath) => dispatch(setRoutePath(routePath)),
    };
  }
}
