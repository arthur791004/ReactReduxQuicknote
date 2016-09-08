import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Checkbox, TextField, RaisedButton } from 'material-ui';
import { setConfig, setRoutePath } from '../actions';

class Config extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit(event) {
    event.preventDefault();

    const { hostname, port, enableSSL } = this;
    const config = {
      hostname: hostname.getValue().trim(),
      port: port.getValue().trim(),
      enableSSL: enableSSL.isChecked()
    };

    console.log('submit', config);
    this.props.setConfig(config);
    this.props.setRoutePath('/');
  }

  render() {
    const { hostname, port, enableSSL } = this.props.config;
    return (
      <form onSubmit= { this.onSubmit.bind(this) }>
        <section>
          <TextField
            defaultValue={ hostname }
            autoFocus="true"
            hintText="請輸入 mail2000 Hostname"
            floatingLabelText="Mail2000 Hostname"
            floatingLabelFixed={ true }
            type="text"
            ref={ ref => this.hostname = ref }
          />
        </section>
        <section>
          <TextField
            defaultValue={ port }
            hintText="請輸入 mail2000 Port"
            floatingLabelText="Mail2000 Port"
            floatingLabelFixed={ true }
            type="value"
            ref={ ref => this.port = ref }
          />
        </section>
        <section>
          <Checkbox
            defaultChecked={ enableSSL }
            label="Enable SSL"
            ref={ ref => this.enableSSL = ref }
          />
        </section>
        <section>
          <RaisedButton label="確定" type="submit" />
        </section>
      </form>
    );
  }
}

Config.propTypes = {
  config: PropTypes.object.isRequired,
  setConfig: PropTypes.func.isRequired,
  setRoutePath: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Config);

function mapStateToProps(state) {
  return {
    config: state.config
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setConfig: (config) => dispatch(setConfig(config)),
    setRoutePath: (routePath) => dispatch(setRoutePath(routePath)),
  };
}
