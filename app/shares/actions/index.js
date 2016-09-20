import { hashHistory } from 'react-router';
import { APP, CONFIG, QUICKNOTE, USER } from '../constants';

export {
  addQuickNote,
  requestAddQuicknote,
  requestOpengraph,
  closeSnackbar,
  authUser,
  setConfig,
  setRoutePath,
  showConfigDialog,
  closeConfigDialog,
  toggleDrawer,
};

function addQuickNote({ title, content }) {
  return {
    type: QUICKNOTE.ADD,
    title,
    content,
  };
}

function requestAddQuicknote({ title, content }) {
  return {
    type: QUICKNOTE.REQUEST_ADD_QUICKNOTE,
    title,
    content,
  };
}

function requestOpengraph(url) {
  return {
    type: QUICKNOTE.REQUEST_OPENGRAPH,
    url,
  };
}

function showConfigDialog() {
  return {
    type: QUICKNOTE.SHOW_CONFIG_DIALOG,
    isShowConfigDialog: true,
  };
}

function closeConfigDialog() {
  return {
    type: QUICKNOTE.CLOSE_CONFIG_DIALOG,
    isShowConfigDialog: false,
  };
}

function closeSnackbar() {
  return {
    type: QUICKNOTE.CLOSE_SNACKBAR,
    snackbar: {
      open: false,
      msg: '',
    },
  };
}

function authUser(authedUser) {
  return {
    type: USER.AUTH_SUCCESS,
    user: authedUser,
  };
}

function setConfig(config) {
  chrome.storage.local.set({ config });
  return {
    type: CONFIG.SET,
    config
  };
}

function setRoutePath(routePath) {
  hashHistory.push(routePath);
  return {
    type: APP.SET_ROUTE_PATH,
    routePath
  };
}

function toggleDrawer(drawer) {
  return {
    type: APP.TOGGLE_DRAWER,
    drawer
  };
}
