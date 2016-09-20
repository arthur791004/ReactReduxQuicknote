import keyMirror from 'keymirror';

const APP = keyMirror({
  NAME: 'Mail2000_Quicknote',
  SET_ROUTE_PATH: null,
  TOGGLE_DRAWER: null,
});

const CONFIG = keyMirror({
  SET: null,
});

const QUICKNOTE = keyMirror({
  ADD: null,
  SHOW_CONFIG_DIALOG: null,
  CLOSE_CONFIG_DIALOG: null,
  CLOSE_SNACKBAR: null,
  REQUEST_ADD_QUICKNOTE: null,
  REQUEST_ADD_QUICKNOTE_PENDING: null,
  REQUEST_ADD_QUICKNOTE_SUCCESS: null,
  REQUEST_ADD_QUICKNOTE_FAIL: null,
  REQUEST_OPENGRAPH: null,
  REQUEST_OPENGRAPH_PENDING: null,
  REQUEST_OPENGRAPH_SUCCESS: null,
  REQUEST_OPENGRAPH_FAIL: null,
});

const USER = keyMirror({
  AUTH_SUCCESS: null,
});

export {
  APP,
  CONFIG,
  QUICKNOTE,
  USER,
};
