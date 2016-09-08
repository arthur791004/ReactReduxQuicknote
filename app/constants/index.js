import keyMirror from 'keymirror';

const APP = keyMirror({
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
