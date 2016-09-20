import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { RaisedButton } from 'material-ui';
import { setConfig, setRoutePath, closeConfigDialog } from '../../shares/actions';
import { renderCheckbox, renderTextField } from '../../shares/utils';

const form = reduxForm({
  form: 'ConfigForm'
});

class Config extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { hostname, port, enableSSL } = this.props.config;
    const config = {
      hostname,
      port,
      enableSSL,
    };

    this.props.setConfig(config);

    setTimeout(() => {
      if (this.props.isShowConfigDialog) {
        this.props.closeConfigDialog();
      } else {
        this.props.setRoutePath('/');
      }
    });
  }

  render() {
    return (
      <form onSubmit= { this.handleSubmit.bind(this) }>
        <section>
          <Field
            name="config.hostname"
            component={ renderTextField }
            label="請輸入 mail2000 Hostname"
            floatingLabelText="Mail2000 Hostname"
            floatingLabelFixed={ true }
            type="text"
            autoFocus="true"
          />
        </section>
        <section>
          <Field
            name="config.port"
            component={ renderTextField }
            label="請輸入 mail2000 Port"
            floatingLabelText="Mail2000 Port"
            floatingLabelFixed={ true }
            type="value"
          />
        </section>
        <section>
          <Field name="config.enableSSL" component={ renderCheckbox } label="Enable SSL" />
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
  isShowConfigDialog: PropTypes.bool.isRequired,
  setConfig: PropTypes.func.isRequired,
  setRoutePath: PropTypes.func.isRequired,
  closeConfigDialog: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(form(Config));

function mapStateToProps(state) {
  const selector = formValueSelector('ConfigForm');
  return {
    initialValues: { config: state.config },
    config: selector(state, 'config') || state.config,
    isShowConfigDialog: state.quicknote.isShowConfigDialog || false,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setConfig: (config) => dispatch(setConfig(config)),
    setRoutePath: (routePath) => dispatch(setRoutePath(routePath)),
    closeConfigDialog: () => dispatch(closeConfigDialog()),
  };
}
