import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { CircularProgress, Dialog, RaisedButton, Snackbar, TextField } from 'material-ui';
import { addQuicknote, closeSnackbar, requestAddQuicknote, requestOpengraph, setRoutePath } from '../../shares/actions';
import { renderTextField, getOrigin } from '../../shares/utils';

const form = reduxForm({
  form: 'AddQuicknoteForm',
  enableReinitialize: true,
});

class AddQuicknote extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { title, content } = this.props;
    const quicknote = {
      title,
      content
    };

    this.props.requestAddQuicknote(quicknote);
  }

  handleReset() {
    this.props.initialize({ title: '', content: '' });
  }

  handleSnackbarTouchTap() {
    const { config, snackbar } = this.props;

    switch(snackbar.action) {
      case '設定':
        this.props.setRoutePath('/config');
        break;
      case '登入':
        window.open(getOrigin(config));
        break;
      default:
        break;
    }
  }

  handleSnackbarClose() {
    this.props.closeSnackbar();
    this.props.reset();
  }

  componentWillMount() {
    chrome.tabs.getSelected(null, tab => {
      this.props.requestOpengraph(tab.url);
    });
  }

  render() {
    const { isLoading, reset, snackbar, submitting } = this.props;
    return (
      <div>
        <Dialog
          contentClassName={ isLoading ? 'loading-dialog' : '' }
          open={ isLoading } >
          <CircularProgress />
        </Dialog>
        <Snackbar
          open={ snackbar.open }
          message={ snackbar.msg }
          action={ snackbar.action || '' }
          autoHideDuration={ 2000 }
          onTouchTap={ this.handleSnackbarTouchTap.bind(this) }
          onRequestClose={ this.handleSnackbarClose.bind(this) }
        />
        <form onSubmit= { this.handleSubmit.bind(this) }>
          <section>
            標題
          </section>
            <Field
              name="title"
              component={ renderTextField }
              label="請輸入隨手記標題"
              autoFocus="true"
            />
          <section>
            內容
          </section>
          <section>
            <Field
              name="content"
              component={ renderTextField }
              label="請輸入隨手記內容"
              multiLine={ true }
              rowsMax={ 4 }
            />
          </section>
          <footer>
            <RaisedButton label="確定" type="submit" disabled={ submitting } />
            <RaisedButton label="重填" onClick={ this.handleReset.bind(this) } />
          </footer>
        </form>
      </div>
    );
  }
}

AddQuicknote.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  addQuicknote: PropTypes.func.isRequired,
  requestAddQuicknote: PropTypes.func.isRequired,
  setRoutePath: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(form(AddQuicknote));

function mapStateToProps(state) {
  const { title, content } = state.quicknote;
  const selector = formValueSelector('AddQuicknoteForm');
  return {
    initialValues: { title, content },
    isLoading: state.quicknote.isLoading,
    snackbar: state.quicknote.snackbar,
    title: selector(state, 'title') || title,
    content: selector(state, 'content') || content,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addQuicknote: (quicknote) => dispatch(addQuicknote(quicknote)),
    closeSnackbar: () => dispatch(closeSnackbar()),
    requestAddQuicknote: (quicknote) => dispatch(requestAddQuicknote(quicknote)),
    requestOpengraph: (url) => dispatch(requestOpengraph(url)),
    setRoutePath: (routePath) => dispatch(setRoutePath(routePath)),
  };
}
