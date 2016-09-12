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
  CLOSE_SNACKBAR: null,
  REQUEST_ADD_QUICKNOTE: null,
  REQUEST_ADD_QUICKNOTE_SUCCESS: null,
  REQUEST_ADD_QUICKNOTE_FAIL: null,
  REQUEST_OPENGRAPH: null,
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
