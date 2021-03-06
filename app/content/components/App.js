import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { AppBar, CircularProgress, Dialog, Snackbar } from 'material-ui';
import Config from '../../shares/components/Config';
import { closeSnackbar, requestAddQuicknote, showConfigDialog } from '../../shares/actions';
import { getOpengraph, getOrigin } from '../../shares/utils';
import '../../shares/styles/app.scss';
import '../styles/content.scss';

class App extends Component {
  constructor(props) {
    super(props);
  }

  handleSnackbarTouchTap() {
    const { config, snackbar, showConfigDialog } = this.props;

    switch(snackbar.action) {
      case '設定':
        showConfigDialog();
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
  }

  handleClick() {
    const selectedText = window.getSelection().toString();

    getOpengraph(document.location.href)
      .then(({ hybridGraph = {} }) => {
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
    const { isShowConfigDialog, isLoading, snackbar } = this.props;
    return (
      <div>
        <Dialog
          contentClassName={ isLoading ? 'loading-dialog' : '' }
          open={ isLoading } >
          <CircularProgress />
        </Dialog>
        <Dialog
          contentClassName="config-dialog"
          open={ isShowConfigDialog } >
            <AppBar
              showMenuIconButton={ false }
              title="隨手記設定" />
            <Config />
        </Dialog>
        <Snackbar
          open={ snackbar.open }
          message={ snackbar.msg }
          action={ snackbar.action || '' }
          autoHideDuration={ 2000 }
          onTouchTap={ this.handleSnackbarTouchTap.bind(this) }
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
  config: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isShowConfigDialog: PropTypes.bool.isRequired,
  snackbar: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

function mapStateToProps(state) {
  return {
    config: state.config,
    isLoading: state.quicknote.isLoading || false,
    isShowConfigDialog: state.quicknote.isShowConfigDialog || false,
    snackbar: state.quicknote.snackbar,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeSnackbar: () => dispatch(closeSnackbar()),
    requestAddQuicknote: (quicknote) => dispatch(requestAddQuicknote(quicknote)),
    showConfigDialog: () => dispatch(showConfigDialog()),
  };
}

