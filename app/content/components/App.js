import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { CircularProgress, Dialog, Snackbar } from 'material-ui';
import { closeSnackbar, requestAddQuicknote } from '../../shares/actions';
import { getOpengraph } from '../../shares/utils';
import '../../shares/styles/app.scss';
import '../styles/content.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }

  handleSnackbarClose() {
    this.props.closeSnackbar();
  }

  handleClick() {
    const selectedText = window.getSelection().toString();

    getOpengraph(document.location.href)
      .then(({ hybridGraph }) => {
        const title = hybridGraph.title;
        const content = `${selectedText}\n\nsource url: ${hybridGraph.url}`;
        const quicknote = {
          title,
          content
        };

        this.props.requestAddQuicknote(quicknote);
      });
  }

  componentDidMount() {
    document.addEventListener('mouseup', (e) => {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const selectedText = selection.toString();
      const left = rect.right + 10;
      const top = window.scrollY + rect.top;

      this.img.style.setProperty('left', left  + 'px');
      this.img.style.setProperty('top', top + 'px');
      this.img.style.setProperty('display', selectedText ? 'block' : 'none');
    });
  }

  render() {
    const imgSrc = chrome.extension.getURL('icon.png');
    const { isLoading, snackbar } = this.props;
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
          autoHideDuration={ 2000 }
          onRequestClose={ this.handleSnackbarClose.bind(this) }
        />
        <img className="add-quicknote" src={ imgSrc }
          onClick={ this.handleClick.bind(this) }
          ref={ ref => this.img = ref } />
      </div>
    );
  }
}

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

function mapStateToProps(state) {
  return {
    isLoading: state.quicknote.isLoading || false,
    snackbar: state.quicknote.snackbar,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeSnackbar: () => dispatch(closeSnackbar()),
    requestAddQuicknote: (quicknote) => dispatch(requestAddQuicknote(quicknote)),
  };
}

