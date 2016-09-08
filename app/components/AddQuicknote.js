import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { CircularProgress, Dialog, RaisedButton, Snackbar, TextField } from 'material-ui';
import { addQuicknote, closeSnackbar, requestAddQuicknote, setRoutePath } from '../actions';

class AddQuicknote extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit(event) {
    event.preventDefault();

    const { title, content } = this;
    const quicknote = {
      title: title.getValue().trim(),
      content: content.getValue(),
    };

    console.log('submit', quicknote);
    this.props.requestAddQuicknote(quicknote);
  }

  onCancel() {
    this.props.setRoutePath('/');
  }

  handleSnackbarClose() {
    this.props.closeSnackbar();
  }

  render() {
    const { title, content, isLoading, snackbar } = this.props;
    return (
      <div>
        <Dialog
          contentClassName={ isLoading ? 'loading-dialog' : '' }
          open={ isLoading }
        >
          <CircularProgress />
        </Dialog>
        <Snackbar
          open={ snackbar.open }
          message={ snackbar.msg }
          autoHideDuration={ 2000 }
          onRequestClose={ this.handleSnackbarClose.bind(this) }
        />
        <form onSubmit= { this.onSubmit.bind(this) }>
          <section>
            標題
          </section>
            <TextField
              defaultValue={ title }
              autoFocus="true"
              hintText="請輸入隨手記標題"
              type="text"
              ref={ ref => this.title = ref }
            />
          <section>
            內容
          </section>
          <section>
            <TextField
              defaultValue={ content }
              hintText="請輸入隨手記內容"
              type="text"
              multiLine={ true }
              rowsMax= { 6 }
              ref={ ref => this.content = ref }
            />
          </section>
          <footer>
            <RaisedButton label="確定" type="submit" />
            <RaisedButton label="取消" onClick={ this.onCancel.bind(this) } />
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
)(AddQuicknote);

function mapStateToProps(state) {
  return {
    title: state.quicknote.title,
    content: state.quicknote.content,
    isLoading: state.quicknote.isLoading,
    snackbar: state.quicknote.snackbar,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addQuicknote: (quicknote) => dispatch(addQuicknote(quicknote)),
    closeSnackbar: () => dispatch(closeSnackbar()),
    requestAddQuicknote: (quicknote) => dispatch(requestAddQuicknote(quicknote)),
    setRoutePath: (routePath) => dispatch(setRoutePath(routePath)),
  };
}
